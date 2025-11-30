import { Link } from 'react-router-dom';
import './MyAppointments.css';

function MyAppointments() {
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
            <h1 className="my-appointments-title">My Appointments</h1>
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
    </div>
  );
}

export default MyAppointments;

