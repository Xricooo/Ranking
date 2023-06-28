const form = document.querySelector("#form-reseña");
const formEditar = document.querySelector("#form-editar-reseña");
const footer = document.querySelector("footer");
const reseñas = document.querySelector("#reseñas");
const nosotros = document.querySelector("#nosotros");
const tituloNormal = document.querySelector("#titulo-normal");
const tituloNosotros = document.querySelector("#titulo-nosotros");

document.querySelector("#mostrar-nosotros").addEventListener("click", () => {
  form.classList.add("dp-n");
  formEditar.classList.add("dp-n");
  footer.classList.add("dp-n");
  reseñas.classList.add("dp-n");
  nosotros.classList.remove("dp-n");
  tituloNormal.classList.add("dp-n");
  tituloNosotros.classList.remove("dp-n");
});

document.querySelector("#add-reseña").addEventListener("click", () => {
  form.classList.remove("dp-n");
  reseñas.classList.add("dp-n");
  footer.classList.add("dp-n");
});

document.querySelector("#close").addEventListener("click", () => {
  tituloNormal.classList.remove("dp-n");
  tituloNosotros.classList.add("dp-n");
  form.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  formEditar.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  /* DEJAR PARA EL FINAL */
  if (document.querySelector("[editando]"))
    document.querySelector("[editando]").removeAttribute("editando");
  form.classList.add("dp-n");
  formEditar.classList.add("dp-n");
  reseñas.classList.remove("dp-n");
  footer.classList.remove("dp-n");
  nosotros.classList.add("dp-n");
});

form.addEventListener("submit", (ev) => {
  footer.classList.remove("dp-n");
  reseñas.classList.remove("dp-n");
  form.classList.add("dp-n");

  ev.preventDefault();
  let nombre = $("#nombre").val();
  let reseña = $("#reseña").val();
  let nota = $("#nota").val();
  {
    /*  */
  }
  let reseñaNueva = $("<div></div>");
  reseñaNueva.addClass("card-reseña");
  reseñaNueva.html(`
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <b style="margin-right: 4px;">Pelicula: </b> <p class="nombre">${nombre}</p>
      </li>
      <li class="list-group-item">
        <b style="margin-right: 4px;">Comentarios: </b>  <p class="reseña">${reseña}</p>
      </li>
      <li class="list-group-item">
        <b style="margin-right: 4px;">Nota: </b> <p class="nota">${nota}</p>
      </li>
      <li class="list-group-item">
        <b>Acciones:</b>
        <button type="button" class="btn btn-dark" style="margin-left: auto;" onclick="editarReseña(event)">
          Editar
        </button>
        <button type="button" class="btn btn-danger" style="margin-left: 2rem; " onclick="borrarElemento(event)">
          Borrar
        </button>
      </li>
    </ul>
    `);
  $("#reseñas").append(reseñaNueva);

  form.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  storeReseñas();
});

const editarReseña = (ev) => {
  let aEditar = ev.target.parentElement.parentElement.parentElement;
  aEditar.setAttribute("editando", "");
  reseñas.classList.add("dp-n");
  formEditar.classList.remove("dp-n");
  $("#editar-nombre").val(aEditar.querySelector(".nombre").innerHTML);
  $("#editar-reseña").val(aEditar.querySelector(".reseña").innerHTML);
  $("#editar-nota").val(aEditar.querySelector(".nota").innerHTML);
};

formEditar.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let editando = document.querySelector("[editando]");

  let nombre = $("#editar-nombre").val();
  let reseña = $("#editar-reseña").val();
  let nota = $("#editar-nota").val();

  editando.querySelector(".nombre").innerHTML = nombre;
  editando.querySelector(".reseña").innerHTML = reseña;
  editando.querySelector(".nota").innerHTML = nota;

  editando.removeAttribute("editando");
  formEditar.classList.add("dp-n");
  reseñas.classList.remove("dp-n");

  storeReseñas();
});

const borrarElemento = (e) => {
  if (confirm("Estás seguro que querés eliminar esta reseña?")) {
    e.target.parentElement.parentElement.remove();
    storeReseñas();
    location.reload();
  }
};

document.querySelector("#borrarTodo").addEventListener("click", () => {
  if (confirm("Estás seguro que querés eliminar TODAS las reseñas?")) {
    localStorage.clear();
    location.reload();
  }
});

const storeReseñas = () => {
  localStorage.setItem("reseñas", $("#reseñas").html());
};

const iniciar = () => {
  reseñasGuardadas = localStorage.getItem("reseñas");

  $("#reseñas").html(reseñasGuardadas);
};

iniciar();
