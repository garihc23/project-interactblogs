import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import Switch from 'react-switch';
import {
  getAllSubscriptions,
  deleteSubscription,
  blockSubscription
} from '../../api/newsletterSubscriptionsApi';

const NewsletterSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getAllSubscriptions(token);
      setSubscriptions(response);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const handleDelete = (subscription) => {
    setSubscriptionToDelete(subscription);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const token = localStorage.getItem('token');
      await deleteSubscription(subscriptionToDelete.subscribeId, token);
      fetchSubscriptions();
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSubscriptionToDelete(null);
  };

  const handleBlock = async (sub) => {
    try {
      const token = localStorage.getItem('token');
      await blockSubscription(sub.subscribeId, token);
      fetchSubscriptions();
    } catch (error) {
      console.error('Error blocking/unblocking subscription:', error);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    if (sortField === 'email') {
      return sortOrder === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
    } else if (sortField === 'createdAt') {
      return sortOrder === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  return (
    <div className="admin-panel-page">
      <h2>Email Subscriptions</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort('email')}>Email {sortField === 'email' && sortOrder === 'asc' ? '▲' : '▼'}</th>
            <th onClick={() => handleSort('createdAt')}>Date Created {sortField === 'createdAt' && sortOrder === 'asc' ? '▲' : '▼'}</th>
            <th>Delete</th>
            <th>Block</th>
          </tr>
        </thead>
        <tbody>
          {sortedSubscriptions.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.email}</td>
              <td>{new Date(sub.createdAt).toLocaleString()}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(sub)}>Delete</Button>
              </td>
              <td>
                <Switch
                  checked={!sub.isBlocked}
                  onChange={() => handleBlock(sub)}
                  onColor="#86d3ff"
                  offColor="#ff5252"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the subscription for {subscriptionToDelete?.email}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteConfirmation}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewsletterSubscriptions;













// import React, { useState, useEffect } from 'react';
// import { Button, Table, Modal } from 'react-bootstrap';
// import Switch from 'react-switch';
// import {
//   getAllSubscriptions,
//   deleteSubscription,
//   blockSubscription
// } from '../../api/newsletterSubscriptionsApi';

// const NewsletterSubscriptions = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);

//   useEffect(() => {
//     fetchSubscriptions();
//   }, []);

//   const fetchSubscriptions = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await getAllSubscriptions(token);
//       setSubscriptions(response);
//     } catch (error) {
//       console.error('Error fetching subscriptions:', error);
//     }
//   };

//   const handleDelete = (subscription) => {
//     setSubscriptionToDelete(subscription);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirmation = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await deleteSubscription(subscriptionToDelete.subscribeId, token);
//       fetchSubscriptions();
//       // setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionToDelete.id));
//       handleCloseDeleteModal();
//     } catch (error) {
//       console.error('Error deleting subscription:', error);
//     }
//   };

//   const handleCloseDeleteModal = () => {
//     setShowDeleteModal(false);
//     setSubscriptionToDelete(null);
//   };

//   const handleBlock = async (sub) => {
//     try {
//       // console.log("SUBB__",sub.subscribeId)
//       const token = localStorage.getItem('token');
//       await blockSubscription(sub.subscribeId, token);
//       fetchSubscriptions();
//     } catch (error) {
//       console.error('Error blocking/unblocking subscription:', error);
//     }
//   };

//   return (
//     <div className="admin-panel-page">
//       <h2>Email Subscriptions</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Delete</th>
//             <th>Block</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subscriptions && subscriptions.map((sub) => (
//             <tr key={sub.id}>
//               <td>{sub.email}</td>
//               <td>
//                 <Button variant="danger" onClick={() => handleDelete(sub)}>Delete</Button>
//               </td>
//               <td>
//                 <Switch
//                   checked={!sub.isBlocked} // Invert isBlocked to match the switch behavior
//                   onChange={() => handleBlock(sub)} // Invert checked value
//                   onColor="#86d3ff" // Green color when not blocked
//                   offColor="#ff5252" // Red color when blocked
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Deletion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete the subscription for {subscriptionToDelete?.email}?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
//           <Button variant="danger" onClick={handleDeleteConfirmation}>Delete</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default NewsletterSubscriptions;
