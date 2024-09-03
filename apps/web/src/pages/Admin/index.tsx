import { useContext, useEffect, useState } from 'react';
import '../../styles/donations.css';
import { SessionContext } from '../../contexts/SessionContext';
import { Button, Grid2, List, MenuItem, Select, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CreateNewUserContext } from '../../contexts/CreateNewUserContext';
import { LoginFormData } from '../Login/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginFormSchema } from '../Login/schema';
import api from '../../services/api';
import { Bounce, toast } from 'react-toastify';

const Admin = () => {
    const { isLogged } = useContext(SessionContext);
    const [textData, setTextData] = useState<string>();
    const [products, setProducts] = useState<{ _id: string, name: string, amount: number }[]>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTextData(e.target.value);
    };

    useEffect(() => {
        if (isLogged === false) {
            window.location.href = "./login";
        }
    }, [isLogged]);

    const [isAdmin, setIsAdmin] = useState<number>(0); // Estado para capturar se é admin
    const [isOnSubmitting, setIsOnSubmitting] = useState<boolean>(false); // Estado para capturar se é admin

    const showModalUser = () => {
        const modalUser = document.querySelector("#modalUser");
        modalUser?.classList.add("modalUser");
        const modalShowForm: any = document.querySelector(".modalShowForm");
        modalShowForm.style.display = "flex";
    }
    const showModalProd = () => {
        const modalUser = document.querySelector("#modalProd");
        modalUser?.classList.add("modalProd");
        const modalShowForm: any = document.querySelector(".modalShowFormProd");
        modalShowForm.style.display = "flex";
    }

    const handleCloseModal = (event: any) => {
        const modalUser = document.querySelector("#modalUser");

        if (event.target === modalUser) {
            modalUser?.classList.remove("modalUser");
            modalUser?.classList.add("hide");
        }
    };
    const handleCloseModalProd = (event: any) => {
        const modalUser = document.querySelector("#modalProd");
        if (event.target === modalUser) {
            modalUser?.classList.remove("modalProd");
            modalUser?.classList.add("hide");
        }
    };

    const handleProdSubmit = async () => {
        setIsOnSubmitting(true)
        // try {
        await toast.promise(
            api.post('/product', { name: textData }),
            {
                pending: 'Enviando Produto',
                success: 'Produto Adicionado 👌',
                error: 'Erro ao enviar Produto 🤯'
            },
            {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            }
        )
        // const resp = await api.post('/product', { name: textData })
        // console.log(resp)
        // } catch (error) {
        //     console.log(error)
        // }
        setIsOnSubmitting(false)
        fetchProd()
    }

    const { createuser }: any = useContext(CreateNewUserContext);

    const onSubmit = async ({ password, username }: LoginFormData) => {
        await createuser(username, password, isAdmin); // Envia o valor de isAdmin
    };
    const fetchProd = async () => {
        const resp = await api.get('/product/list')
        console.log(resp)
        setProducts(resp.data.data)
    }
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting, isLoading },
    } = useForm({
        resolver: yupResolver(loginFormSchema),
    });

    useEffect(() => {
        fetchProd()
    }, [])

    return (
        <main className="main-container" id='oi'>
            <article className="main-article">
                <div className='sections-container'>
                    <h5 className='text-section-one'>Administrativo</h5>
                    <section className="section-one">
                        {/* <Button className='btn' onClick={showModalUser}>Cadastrar usuário</Button> */}
                        <button className='button' onClick={showModalUser}>Cadastrar usuário</button>
                        <button className='button' onClick={showModalProd}>Cadastrar Produto</button>
                    </section>
                    <section className='main-donations'>
                        <ul >
                            {products
                                ? products.map((product, index) => (
                                    <li key={index}>Nome: {product.name} | Qtd.: {product.amount}</li>
                                ))
                                : <p>Não há produtos</p>
                            }
                        </ul>
                    </section>
                </div>
            </article>
            <footer className="footer"></footer>
            <div id="modalUser" onClick={handleCloseModal}>
                <div className="bodyModal">
                    <Grid2 className="modalShowForm" size={{ xs: 12 }}>
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
            <div id="modalProd" onClick={handleCloseModalProd}>
                <div className="bodyModal">
                    <Grid2 className="modalShowFormProd" columns={1} size={{ xs: 12 }}>

                        <h2>Cadastrar Produto</h2>
                        <Grid2 container marginTop={4} spacing={2}>
                            <Grid2 size={{ xs: 12 }}>
                                <TextField
                                    error={!!errors?.username}
                                    helperText={errors?.username?.message}
                                    id='productName'
                                    onChange={handleChange}
                                    label="Nome do Produto"
                                    fullWidth
                                />
                            </Grid2>


                            <Grid2
                                size={{ xs: 12 }}
                                display="flex"
                                justifyContent="flex-end"
                                mt={5}
                            >
                                <button
                                    // size="large"
                                    // variant="contained"
                                    // type="submit"
                                    onClick={handleProdSubmit}
                                    className='buton'
                                    // loading={isLoading || isSubmitting}
                                    disabled={isOnSubmitting}
                                // sx={{ textTransform: "none" }}
                                >
                                    Criar Produto
                                </button>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </div>
            </div>
        </main>
    );
};

export default Admin;
