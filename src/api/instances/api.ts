import axios from 'axios';
import {defaultConfig} from '../configs/config';

const api = axios.create({...defaultConfig});

export {api};
