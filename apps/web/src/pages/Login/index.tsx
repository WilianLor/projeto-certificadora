import { useForm } from "react-hook-form";
import { Box, Grid2, TextField, Typography, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { loginFormSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData } from "./types";
import { useSession } from "../../hooks/useSession";

const Login = () => {
  const { login } = useSession();
  const theme = useTheme();

  const onSubmit = async ({ password, username }: LoginFormData) => {
    await login(username, password);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isLoading },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  return (
    <Box
      height="calc(100vh - 65px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid2
        container
        size={{ xs: 10, sm: 8, lg: 6 }}
        spacing={5}
        p={5}
        justifyContent="flex-start"
        sx={{
          background: theme.palette.common.white,
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <Grid2 size={{ xs: 12, sm: 10 }}>
          <Typography fontFamily='Montserrat' fontSize={20} fontWeight={600}>Bem vindo ao Bons Fluidos</Typography>
          <Typography fontFamily='Montserrat' fontSize={20} fontWeight={600}>Faça o login</Typography>
        </Grid2>
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
                  entrar
                </LoadingButton>

              
              </Grid2>
            </Grid2>
          </form>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Login;
