import { IResolvers } from "graphql-tools";
import { database } from "./../data/data.store";

const query: IResolvers = {
  Query: {
    estudiantes(): any {
      return database.estudiantes;
    },
    estudiante(__: void, { id }): any {
      const res = database.estudiantes.filter(
        (estudiante) => estudiante.id === id
      )[0];
      if (res == undefined) {
        return {
          id: "-1",
          name: `No existe estudiante con el Id: ${id}`,
          email: "",
          courses: [],
        };
      }
      return res;
    },
    cursos(): any {
      return database.cursos;
    },
    curso(__: void, { curso }): any {
      const res = database.cursos.filter((curso_) => curso_.id === curso)[0];
      if (res == undefined) {
        return {
          id: "-1",
          title: `No existe curso con el Id: ${curso}`,
          description: "",
          clases: -1,
          time: 0.0,
          logo: "",
          level: "TODOS",
          path: "",
          teacher: "",
          reviews: [],
        };
      }
      return res;
    },
  },
};

export default query;
