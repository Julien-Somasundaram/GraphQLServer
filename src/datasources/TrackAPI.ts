import { RESTDataSource } from "@apollo/datasource-rest";
import { AuthorModel, TrackModel } from "../models";

export class TrackAPI extends RESTDataSource {
    baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/'; 

    getTracks() {
        return this.get<TrackModel[]>('tracks')
    }
     
      getAuthorBy(authorId: string) {
        return this.get<AuthorModel>(`author/${authorId}`)
    }

  }
