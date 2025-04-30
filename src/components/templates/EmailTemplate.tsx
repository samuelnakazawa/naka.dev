export const EmailTemplate = ({ name, email, message }: FormData) => (
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
          textShadow: '0 0 8px rgba(201, 91, 245, 0.3)',
        }}
      >
        Nova Mensagem Recebida
      </h1>
      <p
        style={{
          margin: '8px 0 0',
          fontSize: '14px',
          color: '#b8a2e0',
        }}
      >
        Nova mensagem
      </p>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr',
        gap: '15px',
        marginBottom: '20px',
      }}
    >
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Nome:
        </div>

        <p
          style={{
            color: '#9a4dff',
            textDecoration: 'none',
            transition: 'all 0.3s',
          }}
        >
          {name}
        </p>
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Email:
        </div>

        <a
          href={`mailto:${email}`}
          style={{
            color: '#9a4dff',
            textDecoration: 'none',
            transition: 'all 0.3s',
          }}
        >
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
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        Mensagem:
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
      <p>Mensagem enviada através do formulário de contato</p>
      <p style={{ marginTop: '5px' }}>
        <a
          href="https://seusite.com"
          style={{
            color: '#9a4dff',
            textDecoration: 'none',
          }}
        >
          seusite.com
        </a>
      </p>
    </div>
  </div>
);
