"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get('https://randomuser.me/api/', {
        headers: {
            Accept: 'application/json'
        }
    });
    const results = data.results;
    for (const r of results) {
        yield prisma.location.create({
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
        });
    }
    res.send(results);
}));
app.listen(port);
