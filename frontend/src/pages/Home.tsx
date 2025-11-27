import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SecurityIcon from "@mui/icons-material/Security";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LeadCaptureForm from "../components/LeadCaptureForm";
import PartnerDialog from "../components/PartnerDialog";
import houseKeysImg from "../images/house-keys.png";
import residentialHouseImg from "../images/residential-house.png";
import professionalConsultantImg from "../images/professional-consultant.png";

export default function Home() {
  const location = useLocation();
  const [partnerOpen, setPartnerOpen] = useState(false);

  useEffect(() => {
    if ((location.state as any)?.scrollToPartner) {
      const el = document.getElementById("partner-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.state]);

  return (
    <Box>
      {/* Hero section */}
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h1" gutterBottom>
            Tu hipoteca ideal y a medida
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Broker hipotecario independiente. Conseguimos la mejor hipoteca para
            ti sin que tengas que ir de banco en banco.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Servicio 100% a éxito: solo pagas si tu hipoteca llega a firmarse.
            Te acompañamos desde la elección de la vivienda hasta la notaría.
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <Typography component="li" variant="body1">
              Especialistas en autónomos, extranjeros e inversión inmobiliaria.
            </Typography>
            <Typography component="li" variant="body1">
              Comparamos condiciones en varias entidades para conseguir mejores
              ofertas.
            </Typography>
            <Typography component="li" variant="body1">
              Gestión cómoda y digital, con un experto a tu lado en todo
              momento.
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Operamos como intermediarios de crédito hipotecario, siempre velando
            por tus intereses frente al banco y la parte vendedora.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <LeadCaptureForm />
        </Grid>
      </Grid>

      {/* Stats section */}
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{ p: 2.5, display: "flex", gap: 2, alignItems: "center" }}
              elevation={1}
            >
              <AccountBalanceIcon color="primary" />
              <Box>
                <Typography variant="subtitle1">
                  Acceso a varios bancos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Buscamos y negociamos entre distintas entidades para mejorar
                  tus condiciones.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{ p: 2.5, display: "flex", gap: 2, alignItems: "center" }}
              elevation={1}
            >
              <TrendingUpIcon color="secondary" />
              <Box>
                <Typography variant="subtitle1">
                  Servicio 100% a éxito
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Estudio gratuito de tu perfil hipotecario. Solo cobramos si tu
                  hipoteca se firma.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{ p: 2.5, display: "flex", gap: 2, alignItems: "center" }}
              elevation={1}
            >
              <SecurityIcon color="primary" />
              <Box>
                <Typography variant="subtitle1">
                  Acompañamiento experto
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Te ayudamos a evitar sorpresas: contratos, condiciones y
                  proceso completo bajo control.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Image + short info */}
      <Box
        sx={{
          mt: 6,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Box
          component="img"
          src={houseKeysImg}
          alt="Entrega de llaves de una nueva vivienda"
          sx={{
            width: { xs: "100%", md: "50%" },
            borderRadius: 3,
            objectFit: "cover",
            maxHeight: 320,
          }}
        />
        <Paper
          elevation={2}
          sx={{
            flex: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography variant="h2" gutterBottom>
            Consigue la mejor hipoteca sin ir de banco en banco
          </Typography>
          <Typography variant="body1">
            1. Nos cuentas tu situación y la vivienda que quieres comprar.
          </Typography>
          <Typography variant="body1">
            2. Analizamos tu perfil y comparamos ofertas en distintas entidades
            y partners.
          </Typography>
          <Typography variant="body1">
            3. Negociamos el precio y la hipoteca para que firmes con seguridad
            y las mejores condiciones posibles.
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Nuestro objetivo es que compres bien y con la financiación adecuada,
            evitando errores habituales en el proceso.
          </Typography>
        </Paper>
      </Box>

      {/* Partner section */}
      <Box id="partner-section" sx={{ mt: 6 }}>
        <Paper elevation={1} sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={professionalConsultantImg}
              alt="Profesional del sector inmobiliario"
              sx={{
                width: { xs: "100%", md: "200px" },
                height: { xs: "200px", md: "200px" },
                borderRadius: 3,
                objectFit: "cover",
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h2" gutterBottom>
                ¿Eres inmobiliaria, gestor o abogado?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Colaboramos con profesionales del sector inmobiliario y
                financiero. Si eres inmobiliaria, asesoría, gestoría, abogado o
                similar, te ayudamos a cerrar más operaciones ofreciendo un
                servicio hipotecario completo a tus clientes.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Trabajamos a éxito total y compartimos honorarios en los casos
                en los que se firma hipoteca.
              </Typography>
              <Button variant="outlined" onClick={() => setPartnerOpen(true)}>
                Solicitar estudio para mis clientes
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* FAQ section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h2" gutterBottom>
          Preguntas frecuentes
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>¿Cuánto cobráis por vuestro servicio?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Trabajamos a éxito total: solo cobramos si conseguimos tu hipoteca
              y se firma en notaría. Antes de empezar te explicaremos con
              detalle nuestros honorarios y cuándo se devengan.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>¿Con qué bancos trabajáis?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Colaboramos con diferentes entidades financieras y partners de
              financiación hipotecaria en España. Esto nos permite comparar
              condiciones y buscar la opción más adecuada para tu perfil.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>¿Y si el banco rechaza mi hipoteca?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Analizamos los motivos y, si es posible, presentamos tu caso en
              otras entidades o buscamos alternativas de financiación. Si
              finalmente no se consigue hipoteca, no cobramos honorarios.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              ¿Podéis ayudar si soy autónomo o extranjero?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Sí. Estamos especializados en perfiles autónomos, inversores y
              clientes extranjeros que desean comprar vivienda en España,
              siempre dentro de los requisitos de riesgo de cada entidad.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <PartnerDialog open={partnerOpen} onClose={() => setPartnerOpen(false)} />
    </Box>
  );
}
