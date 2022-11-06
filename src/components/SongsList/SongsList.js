import "./SongsList.scss";

const SongsList = ({ className }) => {
  return (
    <div className={`SongsList ${className}`}>
      <table>
        {[...Array(10)].map((e, i) => {
          return (
            <tr>
              <td className="songNumber">{i}</td>
              <td>
                <div className="songImage"></div>
              </td>
              <td className="songDetails"></td>
              <td>
                <div className="songUser"></div>
              </td>
              <td className="songLength">3:13</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default SongsList;
