在 Windows 服务器上开启 OpenSSH 服务后，你的 Mac 就可以直接通过终端（Terminal）以命令行的方式安全连接 Windows，并实现文件的自动化传输。

以下是为 Windows Server 和 Windows 10/11 系统开启 OpenSSH 服务的步骤：

---

## 步骤一：安装 OpenSSH 服务器

Windows 现在已经将 OpenSSH 作为内置的可选功能，无需下载第三方安装包。

### 方法 A：通过 PowerShell 安装（最快，推荐 ✨）

1. 在 Windows 服务器上，右键点击开始菜单，选择 **“Windows PowerShell (管理员)”** 或 **“终端 (管理员)”**。
2. 输入以下命令检查系统是否已自带 OpenSSH：

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Server*'

```

_如果显示 `State : NotPresent`，说明尚未安装。_

3. 输入以下命令进行安装：

```powershell
Add-WindowsCapability -Online -Name "OpenSSH.Server~~~~0.0.1.0"

```

_等待进度条走完，显示 `Online : True` 和 `RestartNeeded : False` 即表示安装成功。_

### 方法 B：通过图形界面安装

1. 打开 Windows **设置 (Settings) ➡️ 应用 (Apps) ➡️ 可选功能 (Optional features)**。
2. 点击 **“添加功能” (View features)**。
3. 在搜索框输入 `OpenSSH`，勾选 **“OpenSSH 服务器” (OpenSSH Server)**（注意：不要选错成 Client）。
4. 点击下一步并安装，等待系统自动下载安装完成。

---

## 步骤二：启动服务并设置为开机自启

安装完成后，OpenSSH 服务默认是停止状态且为手动启动，需要将其改为自动运行。

在刚刚的 **管理员 PowerShell** 中，依次执行以下三行命令：

```powershell
# 1. 启动 OpenSSH 服务
Start-Service sshd

# 2. 设置为开机自动启动
Set-Service -Name sshd -StartupType 'Automatic'

# 3. 检查服务运行状态（显示 Running 说明正常）
Get-Service sshd

```

---

## 步骤三：配置防火墙放行 22 端口

通常情况下，安装 OpenSSH 时系统会自动创建防火墙规则。为了保险起见，可以在管理员 PowerShell 中执行以下命令，确保 22 端口处于放行状态：

```powershell
if (!(Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" -ErrorAction SilentlyContinue | Select-Object -Property Enabled -ExpandProperty Enabled)) {
    New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
}

```

> ⚠️ **注意：** 如果你的 Windows 服务器托管在阿里云、腾讯云等云厂商，除了系统内部防火墙，你还需要登录**云服务器控制台**，在**安全组（Security Groups）**中增加入站规则，放行 **TCP 22 端口**。

---

## 验证：从 Mac 连接 Windows

现在回到你的 Mac 电脑上，打开终端（Terminal），输入以下命令测试连接：

```bash
ssh username@windows_server_ip

```

- `username`：你登录 Windows 的用户名（如果是微软账号，通常是邮箱或本地用户文件夹名）。
- `windows_server_ip`：Windows 服务器的局域网或公网 IP。

首次连接会提示确认密钥，输入 `yes` 后，再输入 Windows 的登录密码。一旦终端的开头变成了 Windows 的路径（如 `C:\Users\username>`），就说明你已经成功打通了 Mac 到 Windows 的通道！接下来你就可以愉快地在 Mac 上部署各类自动化上传脚本（如 `rsync` 或 `scp`）了。

## 步骤四： 将 Windows SSH 默认 Shell 改为 PowerShell

```powershell
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name "DefaultShell" -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -PropertyType String -Force
```
