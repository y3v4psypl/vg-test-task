import express from 'express'
import type { Express, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import * as dotenv from 'dotenv'
import type { Root } from './interfaces'

dotenv.config()

const prisma = new PrismaClient()

const app: Express = express()
const port = process.env.PORT

app.get('/', async (req: Request, res: Response) => {
  const { data } = await axios.get<Root>(
    'https://randomuser.me/api/',
    {
      headers: {
        Accept: 'application/json'
      }
    })

  const results = data.results

  for (const r of results) {
    await prisma.location.create({
      data: {
        street_number: String(r.location.street.number),
        street_name: r.location.street.name,
        city: r.location.city,
        state: r.location.state,
        country: r.location.country,
        postcode: String(r.location.postcode),
        coordinates_latitude: r.location.coordinates.latitude,
        coordinates_longitude: r.location.coordinates.longitude,
        timezone_offset: r.location.timezone.offset,
        timezone_description: r.location.timezone.description,
        person: {
          create: {
            gender: r.gender,
            title: r.name.title,
            first_name: r.name.first,
            last_name: r.name.last,
            email: r.email,
            dob_date: r.dob.date,
            dob_age: r.dob.age,
            registered_date: r.registered.date,
            registered_age: r.registered.age,
            phone: r.phone,
            cell: r.cell,
            id_name: r.id.name,
            id_value: r.id.value,
            picture_large: r.picture.large,
            picture_medium: r.picture.medium,
            picture_thumbnail: r.picture.thumbnail,
            nat: r.nat,
            login: {
              create: {
                uuid: r.login.uuid,
                username: r.login.username,
                password: r.login.password,
                salt: r.login.salt,
                md5: r.login.md5,
                sha1: r.login.sha1,
                sha256: r.login.sha256
              }
            }
          }
        }
      }
    })
  }

  res.send(results)
})

app.listen(port)
