package com.draftbash.features.users.repositories;

import com.draftbash.features.users.dtos.UserCreationDTO;
import com.draftbash.features.users.dtos.UserCredentialsDTO;
import com.draftbash.features.users.dtos.UserDTO;
import com.draftbash.features.users.interfaces.IUserRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.sql.DataSource;
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
    
    @Override
    public List<UserDTO> getUsersByUsername(String username, int excludeUserId) {
        final String SQL = """
            SELECT id, username, email FROM user_account 
            WHERE username ILIKE :username AND id != :exclude_user_id;
            """;
        Map<String, Object> params = new HashMap<>();
        // Use the '%' wildcard inside the parameter map
        params.put("username", username + "%");
        params.put("exclude_user_id", excludeUserId);
        
        List<UserDTO> users = db.query(SQL, params, 
            (rs, rowNum) -> new UserDTO(
                rs.getInt("id"),
                rs.getString("username"),
                rs.getString("email")
            )
        );
        return users;
    }

    @Override
    public int createUser(UserCreationDTO user) {
        final String SQL = """
                INSERT INTO user_account (username, email, password) 
                VALUES (:username, :email, :password)
                RETURNING id
                """;
        Map<String, Object> params = new HashMap<>();
        params.put("username", user.username());
        params.put("email", user.email());
        params.put("password", user.password());

        return db.queryForObject(SQL, params, Integer.class);
    }

    @Nullable
    @Override
    public Optional<UserCredentialsDTO> getUserByUsername(String username) {
        final String SQL = """
                SELECT id, username, email, password FROM user_account 
                WHERE username = :username LIMIT 1
                """;
        Map<String, Object> params = new HashMap<>();
        params.put("username", username);

        List<UserCredentialsDTO> users = db.query(SQL, params, 
            (rs, rowNum) -> new UserCredentialsDTO(
                rs.getInt("id"),
                rs.getString("username"),
                rs.getString("email"),
                rs.getString("password")
            )
        );
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }

    @Nullable
    @Override
    public Optional<UserCredentialsDTO> getUserByEmail(String email) {
        final String SQL = """
                SELECT id, username, email, password FROM user_account WHERE email = :email LIMIT 1
                """;
        Map<String, Object> params = new HashMap<>();
        params.put("email", email);

        List<UserCredentialsDTO> users = db.query(SQL, params, 
            (rs, rowNum) -> new UserCredentialsDTO(
                rs.getInt("id"),
                rs.getString("username"),
                rs.getString("email"),
                rs.getString("password")
            )
        );
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }
}
