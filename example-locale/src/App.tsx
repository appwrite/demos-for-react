import { Routes, Route } from "react-router-dom"
import Layout from './components/layout'
import Home from "./components/home"
import Countries from "./components/countries"
import EUCountries from "./components/eucountries"
import Phones from "./components/phones"
import Continents from "./components/continents"
import Currencies from "./components/currencies"
import Languages from "./components/languages"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/eu-countries" element={<EUCountries />} />
          <Route path="/phone-codes" element={<Phones />} />
          <Route path="/continents" element={<Continents />} />
          <Route path="/currencies" element={<Currencies />} />
          <Route path="/languages" element={<Languages />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
