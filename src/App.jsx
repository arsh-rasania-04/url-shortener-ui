import { useState } from 'react'

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setCopied(false);
    setIsLoading(true);

    try {
      await fetch('https://url-shortener-api-kppm.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl }),
      });

      if (!response.ok) throw new Error('Invalid URL format');

      const data = await response.json();
      setShortUrl(`https://url-shortener-api-kppm.onrender.com/${data.urlCode}`);
      setOriginalUrl(''); 
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#011627', 
      color: '#d6deeb', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: '"JetBrains Mono", monospace, sans-serif'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '500px', 
        padding: '40px', 
        backgroundColor: '#0b2942', 
        borderRadius: '12px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        border: '1px solid #1d3b53'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#82aaff', fontSize: '28px', letterSpacing: '1px' }}>
          ~/link-shortener
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Enter long URL..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '16px', 
                fontSize: '16px', 
                borderRadius: '8px', 
                border: '1px solid #5f7e97', 
                backgroundColor: '#011627',
                color: '#d6deeb',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#82aaff'}
              onBlur={(e) => e.target.style.borderColor = '#5f7e97'}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              padding: '16px', 
              cursor: isLoading ? 'not-allowed' : 'pointer', 
              backgroundColor: '#82aaff', 
              color: '#011627', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '16px', 
              fontWeight: 'bold',
              transition: 'transform 0.1s ease, opacity 0.3s',
              opacity: isLoading ? 0.7 : 1
            }}
            onMouseDown={(e) => !isLoading && (e.target.style.transform = 'scale(0.98)')}
            onMouseUp={(e) => !isLoading && (e.target.style.transform = 'scale(1)')}
          >
            {isLoading ? 'Shortening...' : 'Generate Link'}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'rgba(239, 83, 80, 0.1)', borderLeft: '4px solid #ef5350', color: '#ef5350' }}>
            {error}
          </div>
        )}
        
        {shortUrl && (
          <div style={{ 
            marginTop: '30px', 
            padding: '24px', 
            backgroundColor: '#011627', 
            border: '1px solid #21c7a8', 
            borderRadius: '8px',
            boxShadow: '0 0 15px rgba(33, 199, 168, 0.1)'
          }}>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#82aaff', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Link Generated
            </p>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'space-between' }}>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', color: '#21c7a8', textDecoration: 'none', wordBreak: 'break-all', fontSize: '18px' }}>
                {shortUrl}
              </a>
              <button 
                onClick={handleCopy}
                style={{ 
                  padding: '10px 20px', 
                  cursor: 'pointer', 
                  border: 'none', 
                  borderRadius: '6px', 
                  backgroundColor: copied ? '#21c7a8' : '#5f7e97', 
                  color: copied ? '#011627' : '#fff',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease',
                  minWidth: '100px'
                }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App