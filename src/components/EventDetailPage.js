import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, ListGroup, Badge, Alert, Tabs, Tab} from 'react-bootstrap'
// Base API URL for all backend requests
const API_URL = "http://52.7.175.102:3000"
const EventDetailPage = ({eventId}) => {
    // Event data state
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Comments state
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentError, setCommentError] = useState('');
    // Favourites state
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteError, setFavoriteError] = useState('');
    // Tickets state
    const [tickets, setTickets] = useState([])
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [ticketPurchaseSuccess, setTicketPurchaseSuccess] = useState(false);
    const [editingComment,setEditingComment] = useState(null);
    const [editingTicket, setEditingTicket] = useState(null);
    const [updatedCommentContent, setUpdatedCommentContent] = useState("");
    const [updatedTicketData, setUpdatedTicketData] = useState({
        price: "",
        seat_number: ""
    })
    // initialise to this index, as this is a hardcoded user ID only for development purposes
    const userId = 1;

    // Fetch all event related data when component mounts/ or when the eventID/userID changes
    useEffect(() => {
        const fetchEventData = async () =>{
            try{
                setLoading(true);
                // Fetch event details
                const eventResponse = await axios.get(`${API_URL}/events/${eventId}`);
                setEvent(eventResponse.data);
                // Fetch event comments
                const commentsResponse = await axios.get(`${API_URL}/events/${eventId}/comments`);
                setComments(commentsResponse.data)
                // Check if event is in users favourites
                try{
                    const favoriteResponse = await axios.get(`${API_URL}/users/${userId}/favourites`);
                    const userFavorites = favoriteResponse.data;
                    setIsFavorite(userFavorites.some(fav => fav.event_id === eventId));
                } catch (err){
                    console.error("Error checking favourite status:", err);
                }
                // Fetch available tickets for events
                const ticketsResponse = await axios.get(`${API_URL}/events/${eventId}/tickets`);
                setTickets(ticketsResponse.data);

                setLoading(false);
            } catch (err){
                setError('Failed to load event data. Please try again later');
                setLoading(false);
                console.error(err);
            }
        }

        fetchEventData();
    }, [eventId, userId]);
    // Handles adding a new comment to the event
    const handleAddComment = async (e) => {
        e.preventDefault();
        // Validate comment content
        if (!newComment.trim()) {
            setCommentError('Comment cannot be empty');
            return;
        }

        try{
            const response = await axios.post(`${API_URL}/events/${eventId}/comments`, {
                comment: {
                    content: newComment,
                    user_id: userId,
                    event_id: eventId
                }
            });

            setComments([...comments, response.data]);
            setNewComment('');
            setCommentError('');
        } catch (err) {
            setCommentError('Failed to add comment. Please try again')
            console.error(err);
        }
    };
    // Toggles whether the event is in the users favourites
    const handleToggleFavorite = async () => {
        try {
            if (isFavorite) {
                const favoriteResponse = await axios.get(`${API_URL}/users/${userId}/favourites`);
                const favorite = favoriteResponse.data.find(fav => fav.event_id === eventId);

                if (favorite) {
                    await axios.delete(`${API_URL}/favourites/${favorite.id}`);
                    setIsFavorite(false);
                }
            } else {
                // Add to favourites
                await axios.post(`${API_URL}/favourites`, {
                    favourite: {
                        user_id: userId,
                        event_id: eventId
                    }
                });
                setIsFavorite(true);
            }
            setFavoriteError('');
        }catch (err){

            setIsFavorite('Failed to update favorite status. Please try again');
            console.error(err);
        }
    };
    // Toggles ticket selection
    const handleTicketSelection = (ticketId) => {
        if (selectedTickets.includes(ticketId)) {
            setSelectedTickets(selectedTickets.filter(id => id !== ticketId));
        } else{
            setSelectedTickets([...selectedTickets, ticketId]);
        }
    }

    // Generate new tickets fo the event through the API
    const handleGenerateTickets = async () => {
        try{
            await axios.post(`${API_URL}/events/${eventId}/generate_tickets`);
            const ticketResponse = await axios.get(`${API_URL}/events/${eventId}/tickets`);
            setTickets(ticketResponse.data);
            alert('Tickets have been generated successfully')
        }catch(err){
            console.error('Error generating tickets:', err)
            alert('Failed to generate tickets');
        }
    }

    // Delete a comment from the event
    const handleDeleteComment = async (commentId) => {
        try{
            await axios.delete(`${API_URL}/events/${eventId}/comments/${commentId}`);
            setComments(comments.filter(comment => comment.id !== commentId));
        }catch (err){
            console.error("Error deleting comment:", err)
            if (err.response && err.response.status === 404){
                setComments(comments.filter(comment => comment.id !== commentId))
                console.log("Comment was already deleted or doesn't exist")
            }else {
                alert("Failed to delete comment")
            }
        }
    };

    // Updates existing comment with new comment
    const handleUpdateComment = async (commentId, updatedComment) => {
        try {
            const response = await axios.patch(`${API_URL}/events/${eventId}/comments/${commentId}`, {
                comment: {
                    content: updatedComment
                }
            });
            // Update comment local state
            setComments(comments.map(comment =>
                comment.id === commentId ? response.data : comment
            ))
            setEditingComment(null);
        }catch (err){
            console.error("Error updating comment", err);
            alert("Failed to update comment")
        }
    }

    // Deletes a ticket from an event
    const handleDeleteTicket = async (ticketId) => {
        try{
            await axios.delete(`${API_URL}/tickets/${ticketId}`);
            setTickets(tickets.filter(ticket => ticket.id !== ticketId));
        }catch (err){
            console.error("Error deleting tickets", err);
            alert("Failed to delete ticket")
        }
    }
    // Updates an existing ticket with new data
    const handleUpdateTicket = async (ticketId, updatedData) =>{
        try{
            const response = await axios.patch(`${API_URL}/tickets/${ticketId}`, {
                ticket: updatedData
            });
            setTickets(tickets.map(ticket =>
                ticket.id === ticketId ? response.data :ticket
            ))
            setEditingTicket(null)
        } catch (err) {
            console.error("Error updating ticket:", err)
            alert("Failed to update ticket")
        }
    }

    // Process the purchase of all selected tickets
    const handlePurchaseTickets = async () => {
        if(selectedTickets.length === 0) return;

        try{
            const purchasePromises = selectedTickets.map(ticketId =>
                axios.patch(`${API_URL}/tickets/${ticketId}`, {
                    ticket: {
                        user_id: userId
                    }

                })
            )

            await Promise.all(purchasePromises);

            const updatedTickets = tickets.map(ticket =>{
                if(selectedTickets.includes(ticket.id)){
                    return { ...ticket, user_id: userId};
                }
                return ticket;
            });

            setTickets(updatedTickets);
            setSelectedTickets([]);
            setTicketPurchaseSuccess(true);
            // Auto hide success message after 3 seconds
            setTimeout(() =>{
                setTicketPurchaseSuccess(false);
            }, 3000);
        } catch (err){
            console.error("Error purchasing tickets:", err);
        }
    };

    // Loading error and not fount states
    if (loading) return <div className="text-center my-5">Loading event details...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!event) return <Alert variant="warning">Event not found</Alert>;

    return(
        <Container className="py-5">
            {/* Event Header Section*/}
            <Row className="mb-4">
                <Col>
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <h1>{event.title}</h1>
                            <p className="text-muted">{new Date(event.date).toLocaleString()}</p>
                            <p>Location: {event.location}</p>
                        </div>
                        <Button
                            variant={isFavorite ? "warning" : "outline-warning"}
                            onClick={handleToggleFavorite}
                            className="ms-2"
                        >

                            {isFavorite ? 'Favorited' : 'Add to Favorites'}
                        </Button>
                    </div>
                    {favoriteError && <Alert variant="danger">{favoriteError}</Alert>}
                </Col>
            </Row>

            {/* Event Description Card */}
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Event Description</Card.Title>
                            <Card.Text>{event.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Tabs for comments and tickets*/}
            <Tabs defaultActiveKey="comments" className="mb-5">
                {/* Comments tab*/}
                <Tab eventKey="comments" title="Comments">
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Comments & Notes</Card.Title>
                            {/* Comments List */}
                            <ListGroup variant="flush" className="mb-4">
                                {comments.length === 0 ? (
                                    <ListGroup.Item>No comments yet. Be the first to add one</ListGroup.Item>
                                ):(
                                    comments.map(comment => (
                                        <ListGroup.Item key={comment.id}>
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <strong>User {comment.user_id}</strong> <small className="text-muted">{new Date(comment.created_at).toLocaleString()}</small>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => {
                                                            setEditingComment(comment.id);
                                                            setUpdatedCommentContent(comment.content)
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => handleDeleteComment(comment.id)}

                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                            {/* Editing Interface for comments*/}
                                            {editingComment === comment.id ? (
                                                <Form className="mt-2" onSubmit={(e) => {
                                                    e.preventDefault()
                                                    handleUpdateComment(comment.id, updatedCommentContent);
                                                }}>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={2}
                                                        value={updatedCommentContent}
                                                        onChange={(e) => setUpdatedCommentContent(e.target.value)}
                                                        className="mb-2"
                                                    />
                                                    <div>
                                                        <Button type="submit" variant="primary" size="sm" className="me-2">Save</Button>
                                                        <Button
                                                            variant="secondary"
                                                            size="sm"
                                                            onClick={() => setEditingComment(null)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </Form>
                                            ): (
                                                <p className="mb-0 mt-2">{comment.content}</p>
                                            )}
                                        </ListGroup.Item>
                                    ))
                                )}
                            </ListGroup>

                            {/* Add Comment Form */}
                            <Form onSubmit={handleAddComment}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Add a Comment</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Share your thoughts about this event..."
                                    />
                                </Form.Group>
                                {commentError && <Alert variant="danger">{commentError}</Alert>}
                                <Button type="submit" variant="primary">
                                    Post Comment
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Tab>

                {/* Tickets Tab*/}
                <Tab eventKey="tickets" title="Tickets">
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Available Tickets</Card.Title>
                            {/* Purchase success message*/}
                            {ticketPurchaseSuccess && (
                                <Alert variant="success" className="mb-4">
                                    Tickets purchased successfully
                                </Alert>
                            )}
                            {/* Available Tickets list*/}
                            <ListGroup className="mb-4">
                                {tickets.length === 0 ? (
                                    <>
                                        <ListGroup.Item>No tickets available for this event</ListGroup.Item>
                                        <div className="text-center mt-3 mb-4">
                                            <Button
                                                variant="outline-primary"
                                                onClick={() => handleGenerateTickets()}
                                            >
                                                Generate Tickets for this Event
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    tickets.filter(ticket => !ticket.user_id).map(ticket => (
                                        <ListGroup.Item key={ticket.id} className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>${ticket.price}</strong>
                                                {ticket.seat_number && <span className="ms-3">Seat: {ticket.seat_number}</span> }
                                            </div>
                                            <div>
                                                {/* Ticket selection box*/}
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={selectedTickets.includes(ticket.id)}
                                                    onChange={() => handleTicketSelection(ticket.id)}
                                                    label="Select"
                                                />
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => {
                                                        setEditingTicket(ticket.id)
                                                        setUpdatedTicketData(
                                                            {
                                                                price: ticket.price,
                                                                seat_number: ticket.seat_number
                                                            })
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteTicket(ticket.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>

                                        </ListGroup.Item>
                                    ))
                                )}
                            </ListGroup>
                            {/* Purchase summary button*/}
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>Total: ${selectedTickets.reduce((sum, ticketId) => {
                                        const ticket = tickets.find(t => t.id === ticketId);
                                        return sum + (ticket ? parseFloat(ticket.price) : 0);
                                    }, 0).toFixed(2)}</strong>
                                </div>
                                <Button
                                    variant="success"
                                    disabled={selectedTickets.length === 0}
                                    onClick={handlePurchaseTickets}
                                >
                                    Purchase Tickets ({selectedTickets.length})
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                    {/* Purchased User tickets */}
                    <Card className="mt-4">
                        <Card.Body>
                            <Card.Title>Your Tickets</Card.Title>
                            <ListGroup>
                                {tickets.filter(ticket => ticket.user_id === userId).length === 0 ? (
                                    <ListGroup.Item>You haven't purchased any tickets at the moment</ListGroup.Item>
                                ) :(
                                    tickets.filter(ticket => ticket.user_id === userId).map(ticket => (
                                        <ListGroup.Item key={ticket.id}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <Badge bg="success" className="me-2">Purchased</Badge>
                                                    <strong>${ticket.price}</strong>
                                                    {ticket.seat_number && <span className="ms-3">Seat: {ticket.seat_number}</span> }
                                                </div>
                                                <Button variant="outline-secondary" size="sm">Download</Button>
                                            </div>
                                        </ListGroup.Item>
                                    ))
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>

            {/* Ticket edit modal */}
            {editingTicket && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}}>
                    <Card style={{width: '400px'}}>
                        <Card.Header>Edit Ticket</Card.Header>
                        <Card.Body>
                            <Form onSubmit={(e) => {
                                e.preventDefault()
                                handleUpdateTicket(editingTicket, updatedTicketData)
                            }}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.01"
                                        value={updatedTicketData.price}
                                        onChange={(e) => setUpdatedTicketData({...updatedTicketData, price: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Seat Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={updatedTicketData.seat_number || ""}
                                        onChange={(e) => setUpdatedTicketData({...updatedTicketData, seat_number: e.target.value })}
                                    />
                                </Form.Group>
                                <div className="d-flex justify-content-end">
                                    <Button variant="secondary" className="me-2" onClick={() => setEditingTicket(null)}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Save Changes
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </Container>
    )
}

export default EventDetailPage