import { database } from "./../data/data.store";
import { IResolvers } from "graphql-tools";
import _ from "lodash";
import { cursorTo } from "readline";

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
      return {
        id: -1,
        title: `El curso ya existe`,
        description: "",
        clases: -1,
        time: 0.0,
        level: "TODOS",
        logo: "",
        path: "",
        teacher: "",
        reviews: [],
      };
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
      return {
        id: -1,
        title: `El curso no existe`,
        description: "",
        clases: -1,
        time: 0.0,
        level: "TODOS",
        logo: "",
        path: "",
        teacher: "",
        reviews: [],
      };
    },
    eliminarCurso(__: void, { id }): any {
      const borrarCurso = _.remove(database.cursos, function (curso) {
        return curso.id === id;
      });
      if (borrarCurso[0] === undefined) {
        return {
          id: -1,
          title: `El curso no se puede borrar porque no se encuentra`,
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
      return borrarCurso[0];
    },
  },
};

export default mutation;
