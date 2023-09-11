import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import { getGoals, reset } from "../features/goalSlice";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goal
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    // return () => {
    //   dispatch(reset());
    // };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const goalList = goals.map((goal) => (
    <GoalItem key={goal._id} goal={goal}></GoalItem>
  ));

  return (
    <>
      <h1>Home</h1>
      <section>
        <h1>Welcome {user && user.username}</h1>
      </section>

      <GoalForm></GoalForm>

      <section>
        {goals.length > 0 ? goalList : <h3>You have not set any goals yet</h3>}
      </section>
    </>
  );
};

export default Home;
