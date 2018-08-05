function changeState(attr, text, opacity, remove) {

  attr.setAttribute('disabled', 'true');
  attr.innerHTML = text;
  attr.style.opacity = opacity;
  attr.removeAttribute(remove);

}
