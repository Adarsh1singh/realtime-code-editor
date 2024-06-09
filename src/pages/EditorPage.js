import React, { useState, useRef, useEffect } from 'react';
import ACTIONS from '../Actions';
import toast from 'react-hot-toast';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import { off } from 'codemirror';

const EditorPage = () => {

  const socketRef = useRef(null);

  const codeRef = useRef(null);

  const location = useLocation();

  const { roomId } = useParams();

  const reactNavigator = useNavigate();

  const [clients, setClients] = useState([
    // { socketId: 1, userName: 'Rakesh K' },
    // { socketId: 2, userName: 'John Doe' },
    // { socketId: 3, userName: 'Jone Doe' },
  ]);

  useEffect(() => {
    const init = async () => {

        if (socketRef.current) {
            console.log('Socket already initialized');
            return;
          }
    
          console.log('Initializing socket...');


      socketRef.current = await initSocket();

      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName,
      });


      // listening for joined event

      socketRef.current.on(ACTIONS.JOINED, ({ clients, userName, socketId }) => {
        if (userName !== location.state?.userName) {
          toast.success(`$(userName) joined the room.`);
          console.log(`$(userName) joined`);
        }
        setClients(clients);
        
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        });

      });



      // listening for disconnected

      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketId, userName }) => {
          toast.success(`${userName} left the room`);
          setClients((prev) => {
            return prev.filter
              (client => client.socketId !== socketId)
          });
        });
    };

    init();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, []);


  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID has been copied to your clipboard');
    }

    catch (err) {
      toast.error('Could not copy the Room ID');
      console.ereor(err);
    }
  }

  function leaveRoom() {
    reactNavigator('/');
  }



  if (!location.state) {
    return <Navigate to="/" />
  }



  return (
    <div className='mainWrap'>
      <div className='aside'>
        <div className='asideInner'>
          <div className='logo'>
            <img className='logoImage'
              src='/code-sync.png'
              alt='logo'
            />
          </div>

          <h3>Connected</h3>
          <div className='clientsList'>
            {clients.map((client) => (
              <Client
                key={client.socketId}
                userName={client.userName}
              />
            ))}
          </div>
        </div>

        <button className='btn copyBtn' 
        onClick={copyRoomId}
        >Copy ROOM ID
        </button>


        <button className='btn leaveBtn' 
        onClick={leaveRoom}
        >Leave
        </button>

      </div>

      <div className='editorwrap'>
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code
          }}
        />
      </div>

    </div>
  );
};

export default EditorPage;

