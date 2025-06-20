import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
      import axios from "axios";
      import Box from "@mui/material/Box";
      import Button from "@mui/material/Button";
      import Typography from "@mui/material/Typography";
      import Modal from "@mui/material/Modal";

    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const style = {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              };

      const LoginModal: React.FC = () => {
        const [open, setOpen] = useState(false);
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();

        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

          const handleLogin = async () => {
              try {
                  const response = await axios.post(
                      `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
                      {
                          email: username,
                          password: password,
                      },
                      {
                          headers: {
                              apikey: SUPABASE_KEY,
                              "Content-Type": "application/json",
                          },
                      }
                  );

                  const accessToken = response.data.access_token;
                  localStorage.setItem("accessToken", accessToken);
                  console.log("accessToken", accessToken);

                  // Décoder le token pour extraire l’ID Supabase
                  const decoded: any = jwtDecode(accessToken);
                  const userId = decoded.sub;

                  // Récupérer le rôle depuis ton backend
                  const profileRes = await axios.get(
                      `${import.meta.env.VITE_API_BASE_URL}/api/user-role/${userId}`,
                      {
                          headers: { Authorization: `Bearer ${accessToken}` },
                      }
                  );
                  console.log("Réponse du backend :", profileRes.data);

                  const role = profileRes.data.role;
                  localStorage.setItem("userId", userId);
                  localStorage.setItem("userRole", role);
                  console.log("userId", userId);
                  console.log("role", role);

                  alert("Connexion réussie");
                  handleClose();

                  if (role === "admin") {
                      navigate("/admin");
                  }
                  else if (role === "employee") {
                      navigate("/employee");
                  } else {
                      navigate("/reservations");
                  }

              } catch (error) {
                  console.error(error);
                  alert("Erreur d'authentification");
              }
          };

        return (
          <div>
              <p>Vous devez être connecté pour réserver une chambre</p>
            <Button variant="outlined" onClick={handleOpen}>
              Connexion
            </Button>
              <Button variant="outlined" onClick={() => window.location.href = "/register"}>
                S'inscrire
                </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Connexion
                </Typography>
                <Box>
                  <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                  />
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                  />
                  <Button variant="contained" onClick={handleLogin} style={{ width: "100%" }}>
                    Se connecter
                  </Button>
                </Box>
              </Box>
            </Modal>
          </div>
        );
      };

      export default LoginModal;