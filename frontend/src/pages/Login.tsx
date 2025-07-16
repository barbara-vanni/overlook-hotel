import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
      import axios from "axios";
      import Box from "@mui/material/Box";
      import Button from "@mui/material/Button";
      import Typography from "@mui/material/Typography";
      import Modal from "@mui/material/Modal";
      import {Container, Paper, TextField} from "@mui/material";

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
    const [_, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        age:"",
        phone: "",
    });
    const navigate = useNavigate();
        //
        // const checkIfAlreadyConnected = () => {
        //     const accessToken = localStorage.getItem("accessToken");
        //     return accessToken !== null;
        // };
        //
        // const handleOpen = () => {
        //     if (checkIfAlreadyConnected()) {
        //         alert("Vous êtes déjà connecté");
        //         return;
        //     }
        //     setOpen(true);
        // };

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

              const decoded: any = jwtDecode(accessToken);
              const userId = decoded.sub;


              const profileRes = await axios.get(
                  `${import.meta.env.VITE_API_BASE_URL}/api/user-role/${userId}`,
                  {
                      headers: { Authorization: `Bearer ${accessToken}` },
                  }
              );


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

          } catch (error: any) {
              if (error.response && error.response.status === 400){
                  setRegisterData({ ...registerData, email: username, password});
                  setShowRegisterModal(true);
              } else{
                  console.error(error);
                  alert("Erreur d'authentification");
              }

          }
      };
    const handleRegister = async () => {
      try {

        const { email, password } = registerData;
        const signupRes = await axios.post(
          `${SUPABASE_URL}/auth/v1/signup`,
          { email, password },
          {
            headers: {
              apikey: SUPABASE_KEY,
              "Content-Type": "application/json",
            },
          }
        );
          const id = signupRes.data.user?.id;
          const accessToken = signupRes.data.access_token;

          await axios.post(
              `${SUPABASE_URL}/rest/v1/client`,
              {
                  id,
                  email,
                  first_name: registerData.firstName,
                  last_name: registerData.lastName,
                  age: registerData.age,
                  phone: registerData.phone,
              },
              {
                  headers: {
                      apikey: SUPABASE_KEY,
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                      Prefer: "return=representation"
                  },
              }
          );

        alert("Inscription réussie, vous pouvez vous connecter.");
        setShowRegisterModal(false);
        setUsername(email);
        setPassword(password);
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        alert("Erreur lors de l'inscription");
      }
    };

        return (
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh'
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Bienvenue à l'Hôtel Overlook
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
                        Vous devez être connecté pour réserver une chambre
                    </Typography>
                    <Box>
                        <input
                            type="email"
                            placeholder="Adresse Mail"
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
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                            fullWidth
                            disabled={!username || !password}
                        >
                            Connexion
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                setRegisterData({ ...registerData, email: username, password });
                                setShowRegisterModal(true);
                            }}
                            fullWidth
                            disabled={!username}
                        >
                            S'inscrire
                        </Button>
                    </Box>

                </Paper>

                <Modal open={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
                    <Box sx={style}>
                        <Typography variant="h6">Inscription - Informations complémentaires</Typography>
                        <TextField
                            label="Prénom"
                            value={registerData.firstName}
                            onChange={e => setRegisterData({ ...registerData, firstName: e.target.value })}
                            fullWidth sx={{ mt: 2 }}
                        />
                        <TextField
                            label="Nom"
                            value={registerData.lastName}
                            onChange={e => setRegisterData({ ...registerData, lastName: e.target.value })}
                            fullWidth sx={{ mt: 2 }}
                        />
                        <TextField
                            label="Age"
                            value={registerData.age}
                            onChange={e => setRegisterData({ ...registerData, age : e.target.value })}
                            fullWidth sx={{ mt: 2 }}
                            />
                        <TextField
                            label="Téléphone"
                            value={registerData.phone}
                            onChange={e => setRegisterData({ ...registerData, phone: e.target.value })}
                            fullWidth sx={{ mt: 2 }}
                        />
                        <Button
                            variant="contained"
                            sx={{ mt: 3, width: "100%" }}
                            onClick={handleRegister}
                            disabled={!registerData.firstName || !registerData.lastName || !registerData.age|| !registerData.phone}
                        >
                            Valider l'inscription
                        </Button>
                    </Box>
                </Modal>
            </Container>
        );
    };
      export default LoginModal;