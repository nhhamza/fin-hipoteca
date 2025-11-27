import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { API_ENDPOINTS } from "../config";

interface PartnerDialogProps {
  open: boolean;
  onClose: () => void;
}

interface PartnerFormState {
  nombre: string;
  tipoNegocio: string;
  email: string;
  telefono: string;
}

const initialState: PartnerFormState = {
  nombre: "",
  tipoNegocio: "",
  email: "",
  telefono: "",
};

export default function PartnerDialog({ open, onClose }: PartnerDialogProps) {
  const [form, setForm] = useState<PartnerFormState>(initialState);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: keyof PartnerFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.nombre || !form.email || !form.tipoNegocio) {
      setError("Por favor, rellena los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.partner, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        console.error("Error response from server:", await response);

        throw new Error("Error al enviar el formulario");
      }

      setSuccess(
        "Hemos recibido tu solicitud de colaboración. Te contactaremos en breve."
      );
      setForm(initialState);
    } catch (err) {
      console.error(err);
      setError(
        "Ha ocurrido un error al enviar el formulario. Inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm(initialState);
    setError(null);
    setSuccess(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Colaborar como profesional</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Nombre"
            value={form.nombre}
            onChange={handleChange("nombre")}
            required
          />
          <TextField
            label="Tipo de negocio"
            select
            value={form.tipoNegocio}
            onChange={handleChange("tipoNegocio")}
            required
          >
            <MenuItem value="inmobiliaria">Inmobiliaria</MenuItem>
            <MenuItem value="gestoria">Gestoría</MenuItem>
            <MenuItem value="abogado">Abogado</MenuItem>
            <MenuItem value="asesor">Asesoría</MenuItem>
            <MenuItem value="otro">Otro</MenuItem>
          </TextField>
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            required
          />
          <TextField
            label="Teléfono"
            value={form.telefono}
            onChange={handleChange("telefono")}
          />
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
