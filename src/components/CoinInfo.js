import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart, Ohlc } from "../config/api";
import { Line } from "react-chartjs-2";
import Chart from "react-apexcharts";

import {
  Button,
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";
import React from "react";
import datalist from "./datalist";

const CoinInfo = ({ coin }) => {
  // console.log(props.coin.id);
  const [series, setSeries] = useState([]);
  const [historicData, setHistoricData] = useState({});
  const [days, setDays] = useState(1);
  const [timeStamp, setTimeStamp] = useState(0);
  const [o, setO] = useState();
  const [h, setH] = useState();
  const [l, setL] = useState();
  const [c, setC] = useState();
  const { currency } = CryptoState();

  const [options, setOptions] = useState({
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  });

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));
  const classes = useStyles();

  const fetchHistoricData = async () => {
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/ohlc?vs_currency=usd&days=${days}`
      )
      .then((Response) => {
        console.log("res=>", Response);
        for (const obj of Response.data) {
          const t = obj[0];
          const O = obj[1];
          const H = obj[2];
          const L = obj[3];
          const C = obj[4];
          console.log("obj=>", obj);
          // setTimeStamp(obj[0]);
          // setO(obj[1]);
          // setH(obj[2]);
          // setL(obj[3]);
          // setC(obj[4]);
          datalist.push({
            x: t,
            y: [O, H, L, C],
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
      });

    console.log("datalist=", datalist);
    setSeries([
      ...series,
      {
        data: datalist.map((data) => {
          return data;
        }),
      },
    ]);
    console.log(coin.id);
    // setDays(10);
  };

  useEffect(() => {
    fetchHistoricData();

    // console.log(series);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  console.log("data=", historicData);
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Chart
              series={series}
              options={options}
              type="candlestick"
              height={450}
              width={790}
            />
          </>
        )}
      </div>
      //{" "}
    </ThemeProvider>
  );
};

export default CoinInfo;
