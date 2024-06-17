import { GhibliAPI } from "./datasources/GhibliAPI";
import { TrackAPI } from "./datasources/TrackAPI";
import { JWTUser } from "./modules/auth"
import { PrismaClient } from "@prisma/client"


export type Context = {
    dataSources: {
      trackAPI: TrackAPI
      GhibliAPI: GhibliAPI,
      db: PrismaClient
    }
    user: JWTUser | null 
    ;
  };