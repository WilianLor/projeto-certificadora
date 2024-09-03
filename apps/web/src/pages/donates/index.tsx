import { useContext, useEffect, useState } from 'react';
import '../../styles/donations.css';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import api from '../../services/api'; // Importando a instância configurada do Axios
import { toast } from 'react-toastify';
import { SessionContext } from '../../contexts/SessionContext';

interface Donation {
  name: string;
  _id: string;
  amount: number;
  created_at: any
}

interface DonationForArray {
  product: string;
  productId: string;
  amount: number;
}

const Donates = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [doar, setDoar] = useState<Donation[]>([]);
  const [myDonate, setMyDonate] = useState<Donation[]>([]);
  const [sendDonate, setSendDonate] = useState<DonationForArray[]>([]);
  const { isLogged } = useContext(SessionContext)

  useEffect(() => {
    if(isLogged === false){
      window.location.href = "./login"
    }
  }, [])

  const upQuantityDonation = (productId: string) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1
    }));
  };

  const downQuantityDonation = (productId: string) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0)
    }));
  };

  const gerarArrayDeObjetos = (): DonationForArray[] => {
    const resultado: DonationForArray[] = [];

    doar.forEach(doa => {
      const quantity = quantities[doa._id] || 0;

      for (let i = 0; i < quantity; i++) {
        resultado.push({
          product: doa.name,
          productId: doa._id,
          amount: 1
        });
      }
    });

    return resultado;
  };

  useEffect(() => {
    const resultado = gerarArrayDeObjetos();
    setSendDonate(resultado);
    console.log("Atualização do array de doações:", resultado);
  }, [quantities, doar]);

  useEffect(() => {
    api.get("/product/list")
      .then(response => {
        setDoar(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api.get("/donation/list-user")
      .then(response => {
        setMyDonate(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const sendDonateNow = () => {
    api.post("/donation/", sendDonate)
      .then(response => {
        if(response.data.status === "success"){
          toast.success("Doação realizada com sucesso!");
        }
        api.get("/donation/list-user")
          .then(response => {
            setMyDonate(response.data.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  function formData(isoDate: string){
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é zero-indexado
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  return (
    <main className="main-container" id='oi'>
      <article className="main-article">
        <div className='sections-container'>
          <section className="section-one">
            Bem-vindo(a), nome da pessoa
          </section>
        
          <section className='main-donations'>
            <div className='my-donations'>
              <div className="header-my-donations">
                <InfoOutlinedIcon />
                minhas doações
              </div>

              <div className="body-myDonations">
                {myDonate.map((donate, index) => (
                  <div className="card-my-donate" key={index}>
                    <div className="header-card-my-donate">
                      <InfoOutlinedIcon />
                    </div>

                    <div className="text-my-donate">
                      <h3>X ({formData(donate.created_at)})</h3>
                      <p>Doou {donate.amount} unidades de x</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='donations'>
              <div className="header-donations">
                <InfoOutlinedIcon />
                Doar
              </div>
              <div className='sendDonations'>
                <button onClick={sendDonateNow}>Concluir doação</button>
              </div>
              <div className="body-donations">
                {doar.map((doa, index) => (
                  <div key={index} className='dona'>
                    <p>{doa.name} - {quantities[doa._id] || 0} unidade(s)</p>
                    <div className="addQuantityDonations">
                      <p onClick={() => upQuantityDonation(doa._id)}>+</p>
                      <p onClick={() => downQuantityDonation(doa._id)}>-</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </article>
      <footer className="footer"></footer>
    </main>
  );
};

export default Donates;
