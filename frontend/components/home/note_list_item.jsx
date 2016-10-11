import React from 'react';
import Moment from 'moment';
import Modal from 'react-modal';
import DeleteNotePrompt from './delete_note_prompt';
import { DeleteModalStyle } from '../modal_styles/delete_modal_style';

class NoteListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deleteModalOpen: false }
    this.deleted = false;
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelectNote = this.handleSelectNote.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
  }

  openDeleteModal() {
    this.setState({ deleteModalOpen: true });
  }

  closeDeleteModal() {
    this.setState({ deleteModalOpen: false });
  }

  handleSelectNote(e){
    // if (!e) var e = window.event;
    // e.cancelBubble = true;
    // if (e.stopPropagation) e.stopPropagation();
    if (this.props.currentNote && this.deleted === false){
      if (this.props.note.id !== this.props.currentNote.id){
        this.props.switchNote(this.props.note);
      }
    }
  }

  handleDelete(e){
    this.deleted = true;
    this.props.destroyNote(this.props.note);
    if (this.props.note.id === this.props.currentNote.id){
      this.props.switchNote(null);
    }
    this.closeDeleteModal()
  }

  renderTitle(){
    if (this.props.note.title === ""){
      return (
        <div className="empty-title">Untitled Note</div>
      );
    }else{
      return (
        <div>{this.props.note.title}</div>
      );
    }
  }

  renderBodyText(){
    let body = document.createElement("div");
    body.innerHTML = this.props.note.body;
    // const bodyText = body.firstChild ? body.firstChild.textContent : body.textContent;
    const bodyText = body.textContent;
    return bodyText;
  }

  render() {
    let selected = "note-item-li"
    if (this.props.currentNote){
      if (this.props.note.id === this.props.currentNote.id) {
        selected += " selected";
      }
    }
    return (
      <li className={selected} onClick={this.handleSelectNote}>
        <div className="note-item-title">
          {this.renderTitle()}
          <button
            className="delete-note-button"
            onClick={this.openDeleteModal}></button>
        </div>
        <div className='last-updated'>
          { Moment(this.props.note.updated_at).fromNow() }
        </div>
        <div className="note-item-body">
          { this.renderBodyText() }
        </div>

        <Modal
          isOpen={this.state.deleteModalOpen}
          onRequestClose={this.closeDeleteModal}
          style={ DeleteModalStyle }>

          <DeleteNotePrompt
            deleteNote={this.handleDelete}
            closeModal={this.closeDeleteModal}/>
        </Modal>

      </li>
    );
  }
};

export default NoteListItem;
