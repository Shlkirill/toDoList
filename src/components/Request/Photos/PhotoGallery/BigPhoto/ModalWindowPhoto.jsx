import react from 'react'
import { Field, reduxForm } from 'redux-form'
import styles from './ModalWindowPhoto.module.css'

const EditTitlePhoto = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component='textarea' name='title' />
            <button>Ok</button>
        </form>
    )
}


const ModalWindowPhoto = ({ setEditMode, title, id, editTitlePhoto, modalMode, deletePhoto }) => {

    const EditTitlePhotoForm = reduxForm({
        form: 'editTitlePhoto'
    })(EditTitlePhoto)

    const onEditTitle = (value) => {
        editTitlePhoto(value.title, id)
        setEditMode({
            mode: false,
            modalMode: ''
        })
    }
    const onDeletePhoto = () => {
        deletePhoto(id)
        setEditMode({
            mode: false,
            modalMode: ''
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.modal}>
                    {modalMode == 'EDIT' && <EditTitlePhotoForm initialValues={{ title }} onSubmit={onEditTitle} onEditTitle={onEditTitle} />}
                    {modalMode == 'DELETE' && <div>
                        <h3>Delete this photo?</h3>
                        <div>
                            <button onClick={onDeletePhoto}>Yes</button>
                            <button>No</button>
                        </div>
                    </div>}
                    <button onClick={() => {
                        setEditMode({
                            mode: false,
                            modalMode: ''
                        })
                    }}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ModalWindowPhoto