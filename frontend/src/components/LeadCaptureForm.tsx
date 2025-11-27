import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { API_ENDPOINTS } from "../config";

interface LeadCaptureFormProps {
  compact?: boolean;
  title?: string;
}

interface LeadFormState {
  nombre: string;
  email: string;
  telefono: string;
  situacionLaboral: string;
  precioVivienda: string;
  ahorros: string;
  ciudad: string;
  aceptaPrivacidad: boolean;
}

const initialState: LeadFormState = {
  nombre: "",
  email: "",
  telefono: "",
  situacionLaboral: "",
  precioVivienda: "",
  ahorros: "",
  ciudad: "",
  aceptaPrivacidad: false,
};

export default function LeadCaptureForm({
  compact,
  title,
}: LeadCaptureFormProps) {
  const [form, setForm] = useState<LeadFormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: keyof LeadFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === "aceptaPrivacidad"
          ? (event.target as HTMLInputElement).checked
          : event.target.value;
      setForm((prev) => ({ ...prev, [field]: value } as LeadFormState));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !form.nombre ||
      !form.email ||
      !form.telefono ||
      !form.situacionLaboral ||
      !form.aceptaPrivacidad
    ) {
      setError(
        "Por favor, rellena todos los campos obligatorios y acepta la política de privacidad."
      );
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.contact, {
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
        "Hemos recibido tu solicitud. Te contactaremos en menos de 24–48h laborales."
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

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title ?? "Solicita tu estudio hipotecario"}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Tu hipoteca ideal y a medida. Cuéntanos tu caso y analizamos tu
          financiación con diferentes bancos y partners. Solo pagas si
          conseguimos tu hipoteca (servicio 100% a éxito).
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Nombre completo"
            value={form.nombre}
            onChange={handleChange("nombre")}
            size={compact ? "small" : "medium"}
            required
          />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            size={compact ? "small" : "medium"}
            required
          />
          <TextField
            label="Teléfono"
            value={form.telefono}
            onChange={handleChange("telefono")}
            size={compact ? "small" : "medium"}
            required
          />
          <TextField
            label="Situación laboral"
            select
            value={form.situacionLaboral}
            onChange={handleChange("situacionLaboral")}
            size={compact ? "small" : "medium"}
            required
          >
            <MenuItem value="trabajador_cuenta_ajena">
              Trabajador por cuenta ajena
            </MenuItem>
            <MenuItem value="autonomo">Autónomo</MenuItem>
            <MenuItem value="funcionario">Funcionario</MenuItem>
            <MenuItem value="otro">Otro</MenuItem>
          </TextField>
          <TextField
            label="Precio aproximado de la vivienda (€)"
            value={form.precioVivienda}
            onChange={handleChange("precioVivienda")}
            size={compact ? "small" : "medium"}
          />
          <TextField
            label="Ahorros disponibles para la entrada (€)"
            value={form.ahorros}
            onChange={handleChange("ahorros")}
            size={compact ? "small" : "medium"}
          />
          <TextField
            label="Provincia / ciudad"
            value={form.ciudad}
            onChange={handleChange("ciudad")}
            size={compact ? "small" : "medium"}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.aceptaPrivacidad}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    aceptaPrivacidad: e.target.checked,
                  }))
                }
              />
            }
            label="He leído y acepto la política de privacidad."
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {loading ? <CircularProgress size={22} /> : "Solicitar estudio"}
          </Button>

          {success && (
            <Alert severity="success" sx={{ mt: 1 }}>
              {success}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
