import PokemonCard from "./PokemonCard"
import SearchAppBar from "./SearchAppBar"
import { Container } from "@mui/system";
import { Grid } from "@mui/material";

function App() {
  return (
    <>
      <SearchAppBar />
      <Container maxWidth="false">
        <Grid container>
          {/* 3/12 */}
          <Grid item xs={3}>
            <PokemonCard />
          </Grid>
          <Grid item xs={3}>
            <PokemonCard />
          </Grid>
          <Grid item xs={3}>
            <PokemonCard />
          </Grid>
          <Grid item xs={3}>
            <PokemonCard />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
