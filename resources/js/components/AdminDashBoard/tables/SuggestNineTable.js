import Pagination from "@material-ui/lab/Pagination";
import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

export default function SuggestNineTable(props) {
    const {
        suggestions,
        last_page,
        getSuggestions,
        deleteSuggestion,
        updateSuggestion
    } = props;

    const [open, setOpen] = useState(false);
    const [open_update, setOpenUpdate] = useState(false);
    const [removeSuggestion, setRenoveSuggestion] = useState({});
    const [reviseSuggestion, setReviseSuggestion] = useState({});

    const handleClickOpen = suggestion => {
        setOpen(true);
        setRenoveSuggestion(suggestion);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenUpdate(false);
    };

    const submit = () => {
        deleteSuggestion(removeSuggestion);
        setOpen(false);
    };

    const update = () => {
        updateSuggestion(reviseSuggestion);
        setOpenUpdate(false);
    };

    const handleChange = (event, value) => {
        getSuggestions(value);
    };

    const handleUpdateClickOpen = suggestion => {
        setOpenUpdate(true);
        setReviseSuggestion(suggestion);
    };

    const getMDate = currentDate => {
        var mydate = new Date(currentDate);
        var month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ][mydate.getMonth()];
        var str = mydate.getDate() + " " + month + " " + mydate.getFullYear();

        return str;
    };

    return (
        <div>
            <table class="table table-striped table-responsive w-100 d-block d-md-table">
                <thead>
                    <tr>
                        <th>
                            Name <i class="fas fa-caret-down"></i>
                        </th>
                        <th>
                            Mapping <i class="fas fa-caret-down"></i>
                        </th>
                        <th>
                            Mapping Change <i class="fas fa-caret-down"></i>
                        </th>
                        <th>
                            Ic9Description <i class="fas fa-caret-down"></i>
                        </th>
                        <th></th>
                        <th>DescriptionChange</th>

                        <th>
                            Ic10AMDescription <i class="fas fa-caret-down"></i>
                        </th>
                        <th></th>
                        <th>DescriptionChange</th>
                        <th>Reason</th>
                        <th>
                            Created Date <i class="fas fa-caret-down"></i>
                        </th>
                        <th>Accept/Reject</th>
                    </tr>
                </thead>

                <tbody class="suggestion_list">
                    {suggestions.map((suggestion, index) => {
                        return (
                            <tr key={index}>
                                <td>{suggestion.name}</td>
                                <td class="text-danger">
                                    {suggestion.ic9code}--{suggestion.ic10code}
                                </td>
                                <td class="text-primary">
                                    {suggestion.ic9codeinput}--
                                    {suggestion.ic10codeinput}
                                </td>
                                <td class="text-danger">
                                    {suggestion.ic9description}
                                </td>
                                <td>
                                    <i class="fas fa-arrow-right text-primary"></i>
                                </td>
                                <td class="text-primary">
                                    {suggestion.ic9descriptionsuggest}
                                </td>

                                <td class="text-danger">
                                    {suggestion.ic10description}
                                </td>
                                <td>
                                    <i class="fas fa-arrow-right text-primary"></i>
                                </td>
                                <td class="text-primary">
                                    {suggestion.ic10descriptionsuggest}
                                </td>
                                <td>{suggestion.reason}</td>

                                <td>{getMDate(suggestion.created_at)}</td>

                                <td class="row justify-content-sm-around">
                                    <div
                                        class="btn btn-success btn-sm m-1 edit"
                                        onClick={() =>
                                            handleUpdateClickOpen(suggestion)
                                        }
                                    >
                                        <i class="fas fa-check edit"></i>
                                    </div>
                                    <div
                                        class="btn btn-danger btn-sm m-1 delete"
                                        onClick={() =>
                                            handleClickOpen(suggestion)
                                        }
                                    >
                                        <i class="fas fa-times delete"></i>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination
                count={last_page}
                color="primary"
                onChange={handleChange}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Suggestion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this suggestion?...
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => submit()} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={open_update}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Change Suggestion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to change this suggestion?...
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => update()} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
