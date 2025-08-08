  import { useState } from 'react'
  import './App.css'
  import logo from './assets/ComposEmail-logo.png';
  import { Box, Button, CircularProgress, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
  import axios from 'axios';

  function App() {
    const [emailContent, setEmailContent] = useState('');
    const [tone, setTone] = useState('');
    const [generatedReply, setGeneratedReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone 
        });
        setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
      } catch (error) {
        setError('Failed to generate email reply. Please try again');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box className="logo-container">
          <img src={logo} alt="ComposEmail Logo" className="logo-image" />
        </Box>
        
        <Box sx={{ mx: 3 }}>
          <TextField 
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            label="Original Email Content"
            value={emailContent || ''}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb:2 }}/>

            <FormControl fullWidth sx={{ mb:2 }}>
              <InputLabel>Tone (Optional)</InputLabel>
              <Select
                value={tone || ''}
                label={"Tone (Optional)"}
                onChange={(e) => setTone(e.target.value)}>
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant='contained'
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              fullWidth>
              {loading ? <CircularProgress size={24}/> : "Generate Reply"}
            </Button>
        </Box>

        {error && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography className="error-message">
              <span className="error-icon">⚠</span>
              {error}
            </Typography>
          </Box>
        )}

        {generatedReply && (
        <Box className="generated-reply" sx={{ mt: 3 }}>
            <Typography variant='h6' gutterBottom>
              Generated Reply:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant='outlined'
              value={generatedReply || ''}
              inputProps={{ readOnly: true }}/>
          
          <Button
            variant='outlined'
            sx={{ mt: 2 }}
            onClick={() => navigator.clipboard.writeText(generatedReply)}>
              Copy to Clipboard
          </Button>
        </Box> 
        )}
      </Container>
    )
  }

  export default App