import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <Container className='c1'>
        <h1 className="navbar-brand text-center" style={{ color: '#00FFFF', fontFamily: 'cursive', fontSize: '2rem' }}>
          OCR for Thai Card by kashish Jain 
        </h1>
      </Container>
    </Navbar>
  );
}

export default Header;
