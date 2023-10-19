import { useEffect, useState } from 'react'

// custom hooks
import useLocalStorage from './hooks/useLocalStorage'

// custom components
import CustomForm from './components/CustomForm'
import EditForm from './components/EditForm'
import TaskList from './components/TaskList'
import ColorSlider from './components/ColorSlider'

function App() {
  const [tasks, setTasks] = useLocalStorage('taskTrackr.tasks', []);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hue, setHue] = useState(240); // Initialize hue to your desired default value

  const handleHueChange = (value) => {
    setHue(value);
    setAccentColor(value);

    // Save the selected color to local storage
    localStorage.setItem('userPreferredColor', value.toString());
  };

  useEffect(() => {
    // Retrieve the user's preferred color from local storage
    const userPreferredColor = localStorage.getItem('userPreferredColor');

    if (userPreferredColor) {
      setHue(parseInt(userPreferredColor, 10)); // Parse and set the hue value
      setAccentColor(parseInt(userPreferredColor, 10)); // Set the initial accent color
    } else {
      // If there's no userPreferredColor in local storage, use the default hue
      const defaultHue = 150; // Replace with your desired default hue
      setHue(defaultHue);
      setAccentColor(defaultHue);
    }
  }, []);


  const setAccentColor = (hue) => {
    const accentColor = `hsl(${hue}, 100%, 50%)`;
    document.documentElement.style.setProperty('--accent', accentColor);
  };

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => (
      t.id === id
        ? { ...t, checked: !t.checked }
        : t
    )))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
        ? { ...t, name: task.name }
        : t
    )))
    closeEditMode();
  }

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  }

  return (
    <div className="container">
      <header>
        <h1>TaskTrackr</h1>
      </header>
      <div>
        {
          isEditing && (
            <EditForm
              editedTask={editedTask}
              updateTask={updateTask}
              closeEditMode={closeEditMode}
            />
          )
        }
        <CustomForm addTask={addTask} />
        {tasks && (
          <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            enterEditMode={enterEditMode}
          />
        )}
      </div>
      <div className='colorSlider'>
        <ColorSlider hue={hue} onHueChange={handleHueChange} />
      </div>
    </div>
  )
}

export default App
