

const PresentationSelect = ({ presentations }) => {

    return(
        <select name="id_presentation">
            <option value={0}>Seleccionar presentación</option>
            {presentations.map(presentation => (
                <option key={presentation.id} value={presentation.id}>{presentation.nombre}</option>
            ))}
        </select>
    );
};

export default PresentationSelect;