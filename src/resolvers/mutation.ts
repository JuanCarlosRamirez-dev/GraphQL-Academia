import { database } from "./../data/data.store";
import { IResolvers } from "graphql-tools";
import _ from "lodash";

const mutation: IResolvers = {
  Mutation: {
    cursoNuevo(__: void, { curso }): any {
      const ItemCurso = {
        id: String(database.cursos.length + 1),
        title: curso.title,
        description: curso.description,
        clases: curso.clases,
        time: curso.time,
        level: curso.level,
        logo: curso.logo,
        path: curso.path,
        teacher: curso.path,
        reviews: [],
      };
      if (
        database.cursos.filter((item) => item.title === ItemCurso.title)
          .length === 0
      ) {
        database.cursos.push(ItemCurso);
        return ItemCurso;
      }
      return noCompletado(1);
    },
    modificarCurso(__: void, { curso }): any {
      const existeElemento = _.findIndex(database.cursos, function (o) {
        return o.id === curso.id;
      });
      if (existeElemento > -1) {
        const valoraciones = database.cursos[existeElemento].reviews;
        curso.reviews = valoraciones;
        database.cursos[existeElemento] = curso;
        return curso;
      }
      return noCompletado(2);
    },
    eliminarCurso(__: void, { id }): any {
      const borrarCurso = _.remove(database.cursos, function (curso) {
        return curso.id === id;
      });
      if (borrarCurso[0] === undefined) {
        return noCompletado(3);
      }
      return borrarCurso[0];
    },
  },
};

export default mutation;

function noCompletado(operacion: number) {
  let title = "";
  switch (operacion) {
    case 1: {
      title = "El curso ya existe con ese titulo";
      break;
    }
    case 2: {
      title = "El curso no existe en la base de datos";
      break;
    }
    case 3: {
      title = "El curso no se puede borrar porque no se encuentra con ese ID";
      break;
    }
    default: {
      break;
    }
  }
  return {
    id: -1,
    title: title,
    description: "",
    clases: -1,
    time: 0.0,
    level: "TODOS",
    logo: "",
    path: "",
    teacher: "",
    reviews: [],
  };
}
