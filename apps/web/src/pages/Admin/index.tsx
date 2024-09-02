import { useContext, useEffect, useState } from 'react';
import '../../styles/donations.css';
import { SessionContext } from '../../contexts/SessionContext';
import { Grid2, MenuItem, Select, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CreateNewUserContext } from '../../contexts/CreateNewUserContext';
import { LoginFormData } from '../Login/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginFormSchema } from '../Login/schema';

const Admin = () => {
    const { isLogged } = useContext(SessionContext);

    useEffect(() => {
        if(isLogged === false){
            window.location.href = "./login";
        }
    }, [isLogged]);

    const [isAdmin, setIsAdmin] = useState<number>(0); // Estado para capturar se é admin

    const showModalUser = () => {
        const modalUser = document.querySelector("#modalUser");
        modalUser?.classList.add("modalUser");
    }

    const handleCloseModal = (event: any) => {
        const modalUser = document.querySelector("#modalUser");

        if (event.target === modalUser) {
            modalUser?.classList.remove("modalUser");
            modalUser?.classList.add("hide");
        }
    };

    const { createuser }: any = useContext(CreateNewUserContext);

    const onSubmit = async ({ password, username }: LoginFormData) => {
        await createuser(username, password, isAdmin); // Envia o valor de isAdmin
    };
    
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting, isLoading },
    } = useForm({
        resolver: yupResolver(loginFormSchema),
    });

    return (
        <main className="main-container" id='oi'>
            <article className="main-article">
                <div className='sections-container'>
                    <section className="section-one">
                        Administrativo
                        <button onClick={showModalUser}>Cadastrar usuário</button>
                    </section>
                    <section className='main-donations'>
                    </section>
                </div>
            </article>
            <footer className="footer"></footer>

            <div id="modalUser" onClick={handleCloseModal}>
                <div className="bodyModal">
                    <Grid2 size={{ xs: 12 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid2 container spacing={2}>
                                <Grid2 size={{ xs: 12 }}>
                                    <TextField
                                        error={!!errors?.username}
                                        helperText={errors?.username?.message}
                                        {...register("username")}
                                        label="Usuário"
                                        fullWidth
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12 }}>
                                    <TextField
                                        error={!!errors?.password}
                                        helperText={errors?.password?.message}
                                        {...register("password")}
                                        type="password"
                                        label="Senha"
                                        fullWidth
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 12 }}>
                                    <Select 
                                        value={isAdmin} 
                                        onChange={(e) => setIsAdmin(e.target.value as number)} // Captura o valor selecionado
                                        fullWidth
                                    >
                                        <MenuItem value={1}>ADMIN</MenuItem>
                                        <MenuItem value={0}>COMUM</MenuItem>
                                    </Select>
                                </Grid2>

                                <Grid2
                                    size={{ xs: 12 }}
                                    display="flex"
                                    justifyContent="flex-end"
                                    mt={5}
                                >
                                    <LoadingButton
                                        size="large"
                                        variant="contained"
                                        type="submit"
                                        loading={isLoading || isSubmitting}
                                        disabled={!isValid || isSubmitting}
                                        sx={{ textTransform: "none" }}
                                    >
                                        Criar usuário
                                    </LoadingButton>
                                </Grid2>
                            </Grid2>
                        </form>
                    </Grid2>
                </div>
            </div>
        </main>
    );
};

export default Admin;
