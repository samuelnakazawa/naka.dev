interface EmailData {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate = ({ name, email, message }: EmailData) => (
  <div
    style={{
      fontFamily: "'Inter', Arial, sans-serif",
      lineHeight: 1.6,
      maxWidth: '600px',
      margin: '0 auto',
      padding: '30px',
      backgroundColor: '#0f061f',
      border: '1px solid #c95bf5',
      borderRadius: '12px',
      boxShadow: '0 0 15px rgba(201, 91, 245, 0.3)',
      color: '#e2d9f3',
    }}
  >
    <div
      style={{
        paddingBottom: '20px',
        marginBottom: '25px',
        borderBottom: '1px solid #2d1b4a',
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: '26px',
          fontWeight: 700,
          background: 'linear-gradient(90deg, #c95bf5 0%, #9a4dff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        New Message Received
      </h1>
      <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#b8a2e0' }}>
        Via naka.dev contact form
      </p>
    </div>

    <div style={{ marginBottom: '20px' }}>
      <div style={{ marginTop: '25px' }}>
        <div
          style={{
            color: '#c95bf5',
            fontWeight: 600,
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          Name:
        </div>
        <p style={{ color: '#e2d9f3', margin: 0 }}>{name}</p>
      </div>

      <div style={{ marginTop: '25px' }}>
        <div
          style={{
            color: '#c95bf5',
            fontWeight: 600,
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          Email:
        </div>
        <a href={`mailto:${email}`} style={{ color: '#9a4dff', textDecoration: 'none' }}>
          {email}
        </a>
      </div>
    </div>

    <div style={{ marginTop: '25px' }}>
      <div
        style={{
          color: '#c95bf5',
          fontWeight: 600,
          marginBottom: '10px',
        }}
      >
        Message:
      </div>
      <div
        style={{
          backgroundColor: '#12071f',
          padding: '20px',
          borderRadius: '8px',
          borderLeft: '3px solid #c95bf5',
          whiteSpace: 'pre-line',
          lineHeight: 1.7,
        }}
      >
        {message}
      </div>
    </div>

    <div
      style={{
        marginTop: '30px',
        paddingTop: '20px',
        borderTop: '1px solid #2d1b4a',
        textAlign: 'center',
        fontSize: '12px',
        color: '#5d4a7a',
      }}
    >
      <p>Sent via naka.dev contact form</p>
    </div>
  </div>
);
