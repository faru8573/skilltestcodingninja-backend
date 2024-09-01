import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_URL_REVIEW = `${BACKEND_URL}/api/review`;
