import {
  redirect,
  useNavigate,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import NewPostForm from '../components/NewPostForm';
import { savePost } from '../util/api';

function NewPostPage() {
  const navigate = useNavigate();
  const data = useActionData();
  const navigation = useNavigation();

  // async function submitHandler(event) {
  //   event.preventDefault();
  //   setIsSubmitting(true);
  //   try {
  //     const formData = new FormData(event.target);
  //     const post = {
  //       title: formData.get('title'),
  //       body: formData.get('post-text'),
  //     };
  //     await savePost(post);
  //     navigate('/');
  //   } catch (err) {
  //     setError(err);
  //   }
  //   setIsSubmitting(false);
  // }

  function cancelHandler() {
    navigate('/blog');
  }

  return (
    <>
      {data && data.status && <p>{data.message}</p>}
      <NewPostForm
        onCancel={cancelHandler}
        submitting={navigation.state === 'submitting'} //using the state property of navigation to conditionally show button text and to disable it while submitting
      />
    </>
  );
}

export default NewPostPage;

export async function action({ request }) {
  const formData = await request.formData();
  const post = {
    title: formData.get('title'), //'title' is the 'name' defined in the input element inside the Form component
    body: formData.get('post-text'),
  };
  try {
    savePost(post);
  } catch (err) {
    if (err.status === 422) {
      //handling errors on this same page -> the err object will be "catched" by useActionData
      return err;
    }
    throw err;
  }
  return redirect('/blog');
}
