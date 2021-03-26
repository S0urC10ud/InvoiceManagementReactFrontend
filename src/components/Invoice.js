import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { BsFillTrashFill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DeletionAlert = withReactContent(Swal);

const useStyles = makeStyles({
  root: {
    width: "20rem",
    margin: 10,
    display: "inline-block",
  },
  title: {
    fontSize: "1.5rem",
  },
  pos: {
    marginBottom: 12,
  },
  content: {
    fontSize: "1rem",
  },
  actions: {
    display: "block",
  },
});

export default function Invoice({
  id,
  name,
  priceNet,
  priceGross,
  vat,
  userClearing,
  clearingDate,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [activePriceGross, setActivePriceGross] = useState(priceGross);
  const [activePriceNet, setActivePriceNet] = useState(priceNet);
  const [activeVAT, setActiveVAT] = useState(vat);
  const [activeUserClearing, setActiveUserClearing] = useState(userClearing);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.title}>{name}</div>
        <div>
          <b>ID:</b> {id} - {moment(clearingDate).format("DD.MM.YYYY")}
        </div>

        <div>
          {priceNet}€ -> {priceGross}€ with VAT {vat}€
        </div>
        <div>Cleared by {userClearing}</div>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpen(true)}
        >
          <BiPencil />
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            DeletionAlert.fire({
              title: `Are you sure that you want to delete invoice ${id}?`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes!",
            }).then(() => {
              //TODO: Make REST-Request and reload page
            });
          }}
        >
          <BsFillTrashFill />
        </Button>
      </CardActions>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit invoice {id}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change the details of the selected invoice please fill in the
            form below.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="PriceGross"
            type="number"
            value={activePriceGross}
            onChange={(e) => {
              setActivePriceGross(e.target.value);
            }}
            inputProps={{ min: "0", step: "0.01" }}
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="PriceNet"
            type="number"
            inputProps={{ min: "0", step: "0.01" }}
            onChange={(e) => {
              setActivePriceNet(e.target.value);
            }}
            value={activePriceNet}
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="VAT"
            type="number"
            inputProps={{ min: "0", step: "0.01" }}
            onChange={(e) => {
              setActiveVAT(e.target.value);
            }}
            value={activeVAT}
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Clearing-User"
            type="text"
            onChange={(e) => {
              setActiveUserClearing(e.target.value);
            }}
            value={activeUserClearing}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
