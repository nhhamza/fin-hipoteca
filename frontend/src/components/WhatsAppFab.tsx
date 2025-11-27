import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Fab } from "@mui/material";

export default function WhatsAppFab() {
  const handleClick = () => {
    window.open("https://wa.me/34654860463", "_blank");
  };

  return (
    <Fab
      color="success"
      aria-label="WhatsApp"
      onClick={handleClick}
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1300,
      }}
    >
      <WhatsAppIcon />
    </Fab>
  );
}
