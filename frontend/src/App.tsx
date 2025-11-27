import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import Home from './pages/Home'
import SimuladorHipoteca from './pages/SimuladorHipoteca'
import WhatsAppFab from './components/WhatsAppFab'
import logo from './images/logo.png'

function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handlePartnerClick = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToPartner: true } })
    } else {
      const el = document.getElementById('partner-section')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="FinanciacionHipotecaria.com"
              sx={{
                height: 40,
                width: 'auto',
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button component={Link} to="/" color="primary">
            Inicio
          </Button>
          <Button component={Link} to="/simulador-hipoteca" color="primary">
            Simulador
          </Button>
          <Button component={Link} to="/" variant="contained" color="primary">
            Solicita tu estudio
          </Button>
          <Button color="secondary" variant="contained" onClick={handlePartnerClick}>
            Soy profesional
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulador-hipoteca" element={<SimuladorHipoteca />} />
          </Routes>
        </Container>
      </Box>
      <Box component="footer" sx={{ py: 3, borderTop: 1, borderColor: 'divider', mt: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} FinanciacionHipotecaria.com · Intermediación de crédito hipotecario en España.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            La información mostrada no constituye oferta vinculante. Las condiciones finales dependen de cada entidad financiera.
          </Typography>
        </Container>
      </Box>
      <WhatsAppFab />
    </Box>
  )
}
