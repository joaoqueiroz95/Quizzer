import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteQuiz, getQuizzes } from "../../services/quiz.service";
import CreateQuizFab from "../CreateQuizFab/CreateQuizFab";
import QuizCard from "../QuizCard/QuizCard";
import SearchBar from "../SearchBar/SearchBar";
import { format } from "date-fns";
import TablePagination from "@mui/material/TablePagination";
import { DEFAULT_PAGE_SIZE, ALLOWED_PAGE_SIZES } from "../../constants";
import { IQuiz } from "../../types/quiz";
import { QuizCardsContainer } from "./styles";
import { NotificationManager } from "react-notifications";
import { IconButton, Typography } from "@mui/material";
import { AddQuizIcon, NoContentContainer } from "../QuizCard/styles";

export default function Home() {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState<Array<Omit<IQuiz, "questions">>>([]);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [hasQuizzes, setHasQuizzes] = useState<boolean>();

  const fetchData = async () => {
    const { quizzes, total } = await getQuizzes({
      page,
      limit: rowsPerPage,
      ...(search && { search }),
    });
    setQuizzes(quizzes);
    setTotal(total);

    return total;
  };

  useEffect(() => {
    fetchData().then((res) => {
      setHasQuizzes(res > 0);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, search]);

  const handleClickAddQuiz = () => {
    navigate("/create");
  };

  const handleClickEditQuiz = (id: string) => () => {
    navigate(`/${id}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteQuiz = (id: string) => async () => {
    await deleteQuiz(id).then((res) => {
      NotificationManager.success(`Quiz ${res.name} Deleted`, "Success");
      setPage(0);
    });
    await fetchData();
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
    setPage(0);
  };

  return (
    <>
      {hasQuizzes === false && (
        <NoContentContainer>
          <Typography variant="h6">No Quizzes</Typography>
          <IconButton onClick={handleClickAddQuiz}>
            <AddQuizIcon />
          </IconButton>
          <Typography>Click here to add your first</Typography>
        </NoContentContainer>
      )}
      {hasQuizzes === true && (
        <>
          <SearchBar
            value={search}
            placeholder="Search Quiz"
            onChange={handleSearchChange}
          />
          <QuizCardsContainer>
            <Stack spacing={2}>
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  title={quiz.name}
                  description={quiz.description}
                  date={format(new Date(quiz.createdAt), "y-MM-dd")}
                  isOnline={quiz.isOnline}
                  link={`${process.env.REACT_APP_FRONTEND_URL}/take/${quiz.urlId}`}
                  onEdit={handleClickEditQuiz(quiz.id)}
                  onDelete={handleDeleteQuiz(quiz.id)}
                />
              ))}
            </Stack>
          </QuizCardsContainer>
          <TablePagination
            rowsPerPageOptions={ALLOWED_PAGE_SIZES}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      <CreateQuizFab handleClick={handleClickAddQuiz} />
    </>
  );
}
