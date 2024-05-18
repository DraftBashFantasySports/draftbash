package com.draftbash.features.users;

import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.interfaces.IUserRepository;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

/**
 * Repository for app users.

 * @param db The database connection.
 */
@Repository
public class UserRepository implements IUserRepository {

    private final NamedParameterJdbcTemplate db;

    public UserRepository(DataSource dataSource) {
        this.db = new NamedParameterJdbcTemplate(dataSource);
    }

    @Nullable
    @Override
    public UserDTO getUserByUsername(String username) {
        final String SQL = "SELECT * FROM users WHERE username = :username LIMIT 1";
        Map<String, Object> params = new HashMap<>();
        params.put("username", username);

        List<UserDTO> users = db.query(SQL, params, new AppUserDTORowMapper());
        return users.isEmpty() ? null : users.get(0);
    }

    @Override
    public void createUser(UserDTO user) {
        final String SQL = """
            INSERT INTO users (username, email, password) VALUES (:username, :email, :password)
            """;
        Map<String, Object> params = new HashMap<>();
        params.put("username", user.username());
        params.put("email", user.email());
        params.put("password", user.password());

        db.update(SQL, params);
    }

    @Nullable
    @Override
    public UserDTO getUserByEmail(String email) {
        final String SQL = "SELECT * FROM users WHERE email = :email LIMIT 1";
        Map<String, Object> params = new HashMap<>();
        params.put("email", email);

        List<UserDTO> users = db.query(SQL, params, new AppUserDTORowMapper());
        return users.isEmpty() ? null : users.get(0);
    }

    class AppUserDTORowMapper implements RowMapper<UserDTO> {

        @Override
        public UserDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
            UserDTO user = new UserDTO(
                rs.getString("username"), rs.getString("email"), rs.getString("password"));
            return user;
        }
    }
}
