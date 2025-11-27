import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import mortgageConsultationImg from "../images/mortgage-consultation.png";

type MesNombre =
  | "Enero"
  | "Febrero"
  | "Marzo"
  | "Abril"
  | "Mayo"
  | "Junio"
  | "Julio"
  | "Agosto"
  | "Septiembre"
  | "Octubre"
  | "Noviembre"
  | "Diciembre";

interface ResultadoGlobal {
  cuotaMensual: number;
  cuotaAnual: number;
  costeTotal: number;
  interesesTotales: number;
  interesNominalAnual: number;
  pagadoCapital: number;
  pagadoIntereses: number;
  pendienteCapital: number;
  pendienteIntereses: number;
}

interface AmortizacionFila {
  mes: number;
  cuota: number;
  capital: number;
  interes: number;
  pendiente: number;
}

const meses: MesNombre[] = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function parseNumber(value: string): number {
  if (!value) return 0;
  const normalized = value.replace(/\./g, "").replace(",", ".");
  const num = parseFloat(normalized);
  return Number.isNaN(num) ? 0 : num;
}

function calcularAmortizacion(
  capital: number,
  interesNominalAnual: number,
  anios: number
): { filas: AmortizacionFila[]; resultado: ResultadoGlobal } {
  const mesesTotales = anios * 12;
  const interesMensual = interesNominalAnual / 100 / 12;

  let cuotaMensual = 0;
  if (interesMensual === 0) {
    cuotaMensual = capital / mesesTotales;
  } else {
    cuotaMensual =
      (capital * interesMensual) /
      (1 - Math.pow(1 + interesMensual, -mesesTotales));
  }

  const filas: AmortizacionFila[] = [];
  let pendiente = capital;
  let totalIntereses = 0;

  for (let i = 1; i <= mesesTotales; i++) {
    const interes = pendiente * interesMensual;
    const capitalPagado = cuotaMensual - interes;
    pendiente = pendiente - capitalPagado;

    totalIntereses += interes;

    filas.push({
      mes: i,
      cuota: cuotaMensual,
      capital: capitalPagado,
      interes,
      pendiente: pendiente < 0.01 ? 0 : pendiente,
    });
  }

  const cuotaAnual = cuotaMensual * 12;
  const costeTotal = capital + totalIntereses;

  return {
    filas,
    resultado: {
      cuotaMensual,
      cuotaAnual,
      costeTotal,
      interesesTotales: totalIntereses,
      interesNominalAnual,
      pagadoCapital: 0,
      pagadoIntereses: 0,
      pendienteCapital: capital,
      pendienteIntereses: totalIntereses,
    },
  };
}

function calcularPagosRealizados(
  filas: AmortizacionFila[],
  mesInicio: MesNombre,
  anoInicio: number
) {
  const inicioMesIndex = meses.indexOf(mesInicio);
  if (inicioMesIndex === -1 || !anoInicio) {
    return 0;
  }

  const hoy = new Date();
  const hoyMesIndex = hoy.getMonth(); // 0-11
  const hoyAno = hoy.getFullYear();

  const diffMeses = (hoyAno - anoInicio) * 12 + (hoyMesIndex - inicioMesIndex);
  if (diffMeses <= 0) return 0;
  if (diffMeses >= filas.length) return filas.length;
  return diffMeses;
}

export default function SimuladorHipoteca() {
  const [capitalPrestado, setCapitalPrestado] = useState("180000");
  const [euribor, setEuribor] = useState("1");
  const [diferencial, setDiferencial] = useState("0");
  const [anios, setAnios] = useState("30");
  const [mesAdjudicacion, setMesAdjudicacion] =
    useState<MesNombre>("Noviembre");
  const [anoAdjudicacion, setAnoAdjudicacion] = useState("2025");

  const [resultado, setResultado] = useState<ResultadoGlobal | null>(null);
  const [filas, setFilas] = useState<AmortizacionFila[]>([]);

  const handleCalcular = () => {
    const capital = parseNumber(capitalPrestado);
    const eur = parseNumber(euribor);
    const dif = parseNumber(diferencial);
    const anosNum = parseInt(anios, 10) || 0;

    if (capital <= 0 || anosNum <= 0) {
      setResultado(null);
      setFilas([]);
      return;
    }

    const interesNominalAnual = eur + dif;
    const { filas, resultado } = calcularAmortizacion(
      capital,
      interesNominalAnual,
      anosNum
    );

    const pagosRealizados = calcularPagosRealizados(
      filas,
      mesAdjudicacion,
      parseInt(anoAdjudicacion, 10)
    );

    let pagadoCapital = 0;
    let pagadoIntereses = 0;

    filas.slice(0, pagosRealizados).forEach((f) => {
      pagadoCapital += f.capital;
      pagadoIntereses += f.interes;
    });

    const totalCapital = capital;
    const totalIntereses = resultado.interesesTotales;
    const pendienteCapital = totalCapital - pagadoCapital;
    const pendienteIntereses = totalIntereses - pagadoIntereses;

    setFilas(filas);
    setResultado({
      ...resultado,
      pagadoCapital,
      pagadoIntereses,
      pendienteCapital: pendienteCapital < 0 ? 0 : pendienteCapital,
      pendienteIntereses: pendienteIntereses < 0 ? 0 : pendienteIntereses,
    });
  };

  const hayPagosRealizados =
    resultado && (resultado.pagadoCapital > 0 || resultado.pagadoIntereses > 0);

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Simulador de hipoteca
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Calcula la cuota de tu hipoteca y el coste total aproximado. El
        simulador te muestra cuánto pagas de principal y de intereses en cada
        periodo de la hipoteca, además de un cuadro básico de amortización. Es
        válido tanto para hipotecas a tipo fijo como vinculadas al euríbor.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Datos de la hipoteca
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
              >
                <TextField
                  label="Capital prestado (€)"
                  value={capitalPrestado}
                  onChange={(e) => setCapitalPrestado(e.target.value)}
                />
                <TextField
                  label="Euríbor / Tipo fijo (%)"
                  helperText="Para tipo fijo, introduce el tipo fijo aquí y deja el diferencial a 0."
                  value={euribor}
                  onChange={(e) => setEuribor(e.target.value)}
                />
                <TextField
                  label="Diferencial (%)"
                  value={diferencial}
                  onChange={(e) => setDiferencial(e.target.value)}
                />
                <TextField
                  label="Años de amortización"
                  value={anios}
                  onChange={(e) => setAnios(e.target.value)}
                />
                <TextField
                  select
                  label="Mes adjudicación"
                  value={mesAdjudicacion}
                  onChange={(e) =>
                    setMesAdjudicacion(e.target.value as MesNombre)
                  }
                >
                  {meses.map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Año adjudicación"
                  value={anoAdjudicacion}
                  onChange={(e) => setAnoAdjudicacion(e.target.value)}
                />
                <Typography variant="caption" color="text.secondary">
                  Para un cálculo más exacto en hipotecas variables, introduce
                  el euríbor de referencia del último mes o del mes de revisión.
                  Este simulador tiene carácter orientativo y no sustituye a la
                  información oficial del banco.
                </Typography>
                <Button variant="contained" onClick={handleCalcular}>
                  Calcular
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                component="img"
                src={mortgageConsultationImg}
                alt="Consultoría hipotecaria profesional"
                sx={{
                  width: "100%",
                  borderRadius: 3,
                  mb: 2,
                  objectFit: "cover",
                }}
              />
            </Grid>
            {resultado && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography>
                    <strong>Cuota mensual aproximada:</strong>{" "}
                    {Math.round(resultado.cuotaMensual).toLocaleString("es-ES")}{" "}
                    €
                  </Typography>
                  <Typography>
                    <strong>Cuota anual aproximada:</strong>{" "}
                    {Math.round(resultado.cuotaAnual).toLocaleString("es-ES")} €
                  </Typography>
                  <Typography>
                    <strong>Coste total de la hipoteca:</strong>{" "}
                    {Math.round(resultado.costeTotal).toLocaleString("es-ES")} €
                  </Typography>
                  <Typography>
                    <strong>Intereses totales a pagar:</strong>{" "}
                    {Math.round(resultado.interesesTotales).toLocaleString(
                      "es-ES"
                    )}{" "}
                    €
                  </Typography>
                  <Typography>
                    <strong>Interés nominal anual:</strong>{" "}
                    {resultado.interesNominalAnual.toFixed(3)} %
                  </Typography>
                </Alert>
              </Grid>
            )}
            {resultado && hayPagosRealizados && (
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Pagos realizados (estimados)
                  </Typography>
                  <Typography>
                    <strong>Total capital:</strong>{" "}
                    {Math.round(resultado.pagadoCapital).toLocaleString(
                      "es-ES"
                    )}{" "}
                    €
                  </Typography>
                  <Typography>
                    <strong>Total intereses:</strong>{" "}
                    {Math.round(resultado.pagadoIntereses).toLocaleString(
                      "es-ES"
                    )}{" "}
                    €
                  </Typography>
                  <Typography>
                    <strong>Total:</strong>{" "}
                    {Math.round(
                      resultado.pagadoCapital + resultado.pagadoIntereses
                    ).toLocaleString("es-ES")}{" "}
                    €
                  </Typography>
                </Paper>
              </Grid>
            )}
            {resultado && hayPagosRealizados && (
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Pagos pendientes (estimados)
                  </Typography>
                  <Typography>
                    <strong>Total capital:</strong>{" "}
                    {Math.round(resultado.pendienteCapital).toLocaleString(
                      "es-ES"
                    )}{" "}
                    €
                  </Typography>
                  <Typography>
                    <strong>Total intereses:</strong>{" "}
                    {Math.round(resultado.pendienteIntereses).toLocaleString(
                      "es-ES"
                    )}{" "}
                    €
                  </Typography>
                  <Typography>
                    <strong>Total:</strong>{" "}
                    {Math.round(
                      resultado.pendienteCapital + resultado.pendienteIntereses
                    ).toLocaleString("es-ES")}{" "}
                    €
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      {filas.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Cuadro de amortización (primeros 12 meses)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Aquí puedes ver cómo se reparte cada cuota entre capital e intereses
            durante el primer año de la hipoteca. Los importes son aproximados.
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Mes</TableCell>
                <TableCell>Cuota</TableCell>
                <TableCell>Capital</TableCell>
                <TableCell>Intereses</TableCell>
                <TableCell>Pendiente</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filas.slice(0, 12).map((f) => (
                <TableRow key={f.mes}>
                  <TableCell>{f.mes}</TableCell>
                  <TableCell>
                    {Math.round(f.cuota).toLocaleString("es-ES")} €
                  </TableCell>
                  <TableCell>
                    {Math.round(f.capital).toLocaleString("es-ES")} €
                  </TableCell>
                  <TableCell>
                    {Math.round(f.interes).toLocaleString("es-ES")} €
                  </TableCell>
                  <TableCell>
                    {Math.round(f.pendiente).toLocaleString("es-ES")} €
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
}
