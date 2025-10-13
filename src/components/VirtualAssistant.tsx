import { useNavigate } from 'react-router-dom';
import './VirtualAssistant.css'; 

function VirtualAssistant () { 
  const navigate = useNavigate();

  const irAOtraPagina = () => {
    navigate('/newbutterfly'); 
  };

return (
  <div>
    <div className="boton-imagen">
      <img
        src="src\assets\VirtualAssistant\foca.png"
        alt="tets"
        onClick={irAOtraPagina}
        className="imagen-boton"
      />
       <p>¿Que post eres<br/>según este test?</p>
    </div>
  </div>
);
}
export default VirtualAssistant;