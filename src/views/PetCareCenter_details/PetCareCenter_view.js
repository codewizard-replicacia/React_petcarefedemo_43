
import { Box, Button, Checkbox, Divider, Grid, makeStyles, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_URL, PATH_PETCARECENTER } from "../../utils/constants";
import makeApiCall from "../../utils/makeApiCall";
import { petCareCenterViewConfig } from "../../utils/display_configuration";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    margin: "0 auto",
    width: "90%",
  },
  titleCell: {
    width: "35%",
    textAlign: "right",
    borderBottom: "none",
  },
  valueCell: {
    textAlign: "left",
    borderBottom: "none",
  },
});

const ViewPetCareCenter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const styles = useStyles();

  const [petCareCenter, setPetCareCenter] = useState({});

  useEffect(() => {
    if (id) {
      const fetchPetCareCenterById = async () => {
        const PetCareCenterResponse = await makeApiCall(
          `${BASE_URL}${PATH_PETCARECENTER}(${id})`
        );
        const PetCareCenterJsonResp = await PetCareCenterResponse.json();
        setPetCareCenter(PetCareCenterJsonResp);
      };
      fetchPetCareCenterById();
    }
  }, [id]);
  return (
    <>
      {petCareCenter && (
        <Box padding={2}>
          <Grid>
            <Grid item lg={12} xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Typography className="page-heading" variant="h5">View PetCareCenter</Typography>
                <div  className="action-buttons">
                
                  <Button
                    onClick={() => navigate('/PetCareCenters')}
                    variant="contained"
                    color="secondary"
                    size="small"
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </Grid>
            <Divider />
            <Box marginTop={2} className="form-container">
              <Grid container item lg={12} xs={12}>
                {Object.keys(petCareCenterViewConfig).map((config, ind) => (
                  <>
                    <Grid item lg={5} md={5} xs={12}>
                      <Box marginTop={1}>
                        <Typography variant="h6">{config}</Typography>
                        <Table size="small" className={styles.table}>
                          <TableBody>
                            {petCareCenterViewConfig[config].map(
                              ({ key, value, type }) => (
                                <TableRow key={key} className="responsive-table-row">
                                  <TableCell className={[styles.titleCell, 'row-label'].join(' ')}>
                                    <Typography variant="body1">
                                      {value}:{" "}
                                    </Typography>
                                  </TableCell>
                                  <TableCell className={[styles.valueCell, 'row-value'].join(' ')}>
                                    {
                                      type === "date" ? (
                                      <Typography variant="body1">
                                        {petCareCenter[key] !== null &&
                                          moment.utc(petCareCenter[key]).format(
                                            "DD-MMMM-YYYY HH:mm:ss A"
                                          )}
                                      </Typography>
                                    ) : 
                                    type === "boolean" ? (
                                      <Checkbox
                                        checked={petCareCenter[key] || false}
                                        disabled
                                      />
                                    ) : (
                                      <Typography variant="body1">
                                        {petCareCenter[key]}
                                      </Typography>
                                    )}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </Box>
                    </Grid>
                    <Grid item lg={1} md={1} xs={false} />
                  </>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ViewPetCareCenter;
