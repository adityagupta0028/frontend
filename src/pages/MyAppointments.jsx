import { useState } from 'react';
import { Link } from 'react-router-dom';
import './MyAppointments.css';

function MyAppointments() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    purpose: '',
    date: '',
    startTime: '',
    endTime: ''
  });

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(false);
      setFormData({ purpose: '', date: '', startTime: '', endTime: '' });
      alert('Appointment request submitted successfully!');
    }, 1000);
  };

  // Sample appointment data - replace with actual data from API/state
  const appointments = [
    {
      id: 'APT-001',
      meetingId: 'MEET-12345',
      meetingLink: 'https://meet.example.com/12345',
      createdDate: '2024-01-15',
      meetingTime: '10:00 AM',
      meetingDate: '2024-02-20',
      status: 'Scheduled'
    },
    {
      id: 'APT-002',
      meetingId: 'MEET-12346',
      meetingLink: 'https://meet.example.com/12346',
      createdDate: '2024-01-18',
      meetingTime: '2:30 PM',
      meetingDate: '2024-02-25',
      status: 'Completed'
    },
    {
      id: 'APT-003',
      meetingId: 'MEET-12347',
      meetingLink: 'https://meet.example.com/12347',
      createdDate: '2024-01-20',
      meetingTime: '11:00 AM',
      meetingDate: '2024-03-01',
      status: 'Cancelled'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'scheduled') return 'status-scheduled';
    if (statusLower === 'completed') return 'status-completed';
    if (statusLower === 'cancelled') return 'status-cancelled';
    return 'status-default';
  };

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumb */}
          <div className="my-appointments-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">My Appointments</span>
          </div>

          {/* Main Title */}
          <div className="my-appointments-header">
            <div className="my-appointments-title-row">
              <h1 className="my-appointments-title">My Appointments</h1>
              <button className="request-appointment-btn" onClick={() => setShowModal(true)}>
                Request Appointment
              </button>
            </div>
            <div className="title-divider"></div>
          </div>

          {/* Appointments Table */}
          <div className="appointments-container">
            {appointments.length > 0 ? (
              <div className="appointments-table-wrapper">
                <table className="appointments-table">
                  <thead>
                    <tr>
                      <th>Meeting ID</th>
                      <th>Meeting Link</th>
                      <th>Created Date</th>
                      <th>Meeting Time</th>
                      <th>Meeting Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="meeting-id">{appointment.meetingId}</td>
                        <td className="meeting-link">
                          <a
                            href={appointment.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-text"
                          >
                            {appointment.meetingLink}
                          </a>
                        </td>
                        <td className="created-date">{formatDate(appointment.createdDate)}</td>
                        <td className="meeting-time">{appointment.meetingTime}</td>
                        <td className="meeting-date">{formatDate(appointment.meetingDate)}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-appointments">
                <p>You have no appointments scheduled.</p>
                <Link to="/book-appointment" className="book-appointment-link">
                  Book an Appointment
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Request Modal */}
      {showModal && (
        <div className="appointment-modal-overlay">
          <div className="appointment-modal">
            <div className="appointment-modal-header">
              <h2>Request Appointment</h2>
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleRequestSubmit} className="appointment-modal-form">
              <div className="form-group">
                <label>Purpose</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Consultation, Custom Design"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Availability Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="time-group">
                <div className="form-group">
                  <label>Start Time</label>
                  <input
                    type="time"
                    required
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <input
                    type="time"
                    required
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="appointment-modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAppointments;

