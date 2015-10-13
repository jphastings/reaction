const ClientSideHelpers = {
  handleFormSubmitClientSide(eventOrForm, isEvent = true) {
    let form;
    if (isEvent) {
      eventOrForm.preventDefault();
      form = eventOrForm.nativeEvent.target;
    } else {
      form = eventOrForm;
    }

    const data = new FormData(form);
    fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => res.json())
      .then(data => ComponentRenderer.rerender(data));
  }
}

export default ClientSideHelpers;