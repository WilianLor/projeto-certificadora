import '../styles/home.css';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Home = () => {
  return (
    <main className="main-container" id='oi'>
      <article className="main-article">
        <div className='sections-container'>
          <section className="section-one">
            Sobre Nós
          </section>
          <section className="section-two">
            <div className="column-left">
              <InfoOutlinedIcon sx={{ color: '#E01F4C', fontSize: 30 }} />
            </div>
            <div className="column-right">
              <h2 className="title">Nossos Objetivos</h2>
              <div className="text-box">
                <ul>
                  <li>Combater a pobreza menstrual.</li>
                  <li>Garantir a dignidade da mulher.</li>
                  <li>Dialogar e normalizar a menstruação.</li>
                </ul>
              </div>
            </div>
          </section>
          <section className="section-two">
            <div className="column-left">
              <InfoOutlinedIcon sx={{ color: '#E01F4C', fontSize: 30 }} />
            </div>
            <div className="column-right">
              <h2 className="title">Destino das doações</h2>
              <div className="text-box">
                <p>
                  As doações recebidas pelo projeto Bons Fluidos serão destinados à compra e distribuição de absorventes em escolas públicas a fim de oferecer informação e proporcionar a saúde da mulher.
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className='sidebars-container'>
          <aside className="sidebar-title">
            Onde doar
          </aside>
          <aside className="sidebar-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.532502434753!2d-50.66132561983955!3d-23.187256725062895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94eadf19f06f311f%3A0x8a2e7a0e8621b0f3!2sUTFPR%20Corn%C3%A9lio%20Proc%C3%B3pio!5e0!3m2!1spt-BR!2sbr!4v1724955124971!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 8 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </aside>
        </div>
      </article>
      <footer className="footer"></footer>
    </main>
  );
};

export default Home;
